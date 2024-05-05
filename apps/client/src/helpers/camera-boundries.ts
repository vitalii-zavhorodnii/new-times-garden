import { CAMERA_BOUNDRIES } from 'src/constants/camera-bounds';

export const cameraBoundriesHelper = (
  camera: Phaser.Cameras.Scene2D.Camera,
  positionX: number
): boolean => {
  const { left, right } = CAMERA_BOUNDRIES;

  if (camera.scrollX >= left) {
    camera.scrollX += 0;
  }

  if (camera.scrollX <= right) {
  }

  if (positionX > left && positionX < right) {
    return true;
  }

  return false;
};
