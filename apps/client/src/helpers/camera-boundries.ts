import { CAMERA_BOUNDRIES } from '@constants/camera-boundries.constants';

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
  // console.log({ left, right });
  console.log({ left: positionX > left, right: positionX < right });
  if (positionX > left && positionX < right) {
    return true;
  }

  return false;
};

// console.log('pointermove', { x: this.camera.scrollX });
//       if (!p.isDown) return;

//       if (!isCameraInBounds(this.camera.scrollX)) return;

//       console.log(this.camera.scrollX);
//       this.camera.scrollX -= (p.x - p.prevPosition.x) / this.camera.zoom;
//       // this.camera.scrollY -= (p.y - p.prevPosition.y) / this.camera.zoom;
