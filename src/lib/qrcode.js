import QRCode from 'qrcode';
import jsQR from 'jsqr';

/**
 * Génère un QR code sur un element canvas à partir d'une recette.
 * @param {import('./db.js').Recipe} recipe
 * @param {HTMLCanvasElement} canvasElement
 */
export async function generateRecipeQR(recipe, canvasElement) {
  // On exclut la photo (trop volumineuse pour un QR code) et on sérialise
  const { photo: _omit, ...recipeWithoutPhoto } = recipe;
  const payload = JSON.stringify(recipeWithoutPhoto);
  await QRCode.toCanvas(canvasElement, payload, {
    width: 300,
    margin: 2,
    color: {
      dark: '#2c1a0e',
      light: '#f5f0eb'
    }
  });
}

/**
 * Import depuis caméra : démarre getUserMedia, scanne via jsQR et retourne la recette parsée.
 * @param {HTMLVideoElement} videoElement
 * @returns {Promise<import('./db.js').Recipe>}
 */
export function importFromCamera(videoElement) {
  return new Promise(async (resolve, reject) => {
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
    } catch (err) {
      reject(new Error('Impossible d\'accéder à la caméra : ' + err.message));
      return;
    }

    videoElement.srcObject = stream;
    videoElement.setAttribute('playsinline', 'true');
    await videoElement.play();

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let animId;
    let resolved = false;

    function stopStream() {
      stream.getTracks().forEach((t) => t.stop());
      videoElement.srcObject = null;
      cancelAnimationFrame(animId);
    }

    function scan() {
      if (resolved) return;
      if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        });
        if (code) {
          resolved = true;
          stopStream();
          try {
            const recipe = importFromText(code.data);
            resolve(recipe);
          } catch (e) {
            reject(e);
          }
          return;
        }
      }
      animId = requestAnimationFrame(scan);
    }

    animId = requestAnimationFrame(scan);

    // Timeout au bout de 30s
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        stopStream();
        reject(new Error('Délai d\'attente dépassé — aucun QR code détecté.'));
      }
    }, 30000);
  });
}

/**
 * Import depuis texte JSON collé.
 * @param {string} jsonString
 * @returns {import('./db.js').Recipe}
 */
export function importFromText(jsonString) {
  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch {
    throw new Error('JSON invalide.');
  }

  // Validation minimale
  if (
    typeof parsed !== 'object' ||
    typeof parsed.name !== 'string' ||
    !Array.isArray(parsed.ingredients) ||
    !Array.isArray(parsed.steps)
  ) {
    throw new Error('Le JSON ne correspond pas au format d\'une recette CPLQ.');
  }

  return parsed;
}
