export const COLLISION_NONE = 0;
export const COLLISION_LEFT = 1;
export const COLLISION_RIGHT = 2;

export class RectParticle {
  constructor(posX, posY, wRadius = 60) {
    this.x = posX;
    this.y = posY;
    this.color = '#FF0000';
    this.wRadius = wRadius;
    this.hRadius = 20;
    this.isShadow = false;
    this.collisionType = COLLISION_NONE;
    this.isStoryClip = true;
  }

  get radius() {
    return this.wRadius;
  }

  set radius(value) {
    this.wRadius = value;
  }

  copyProperties(copy) {
    this.color = copy.color;
    this.wRadius = copy.wRadius;
  }

  hitTest(hitX, hitY) {
    return (
      (hitX > this.x - this.wRadius)
      && (hitX < this.x + this.wRadius)
      && (hitY > this.y - this.hRadius)
      && (hitY < this.y + this.hRadius));
  }

  collisionTest(shape) {
    if (
      (shape.x < this.x + this.wRadius)
      && (shape.x > this.x - this.wRadius)
    ) {
      if (shape.x > this.x) {
        return COLLISION_RIGHT;
      }
      return COLLISION_LEFT;
    }
    return COLLISION_NONE;
  }

  isInLane(canvas, lane) {
    return (
      (this.y < canvas.height / 2 + lane * this.hRadius * 2 + this.hRadius)
      && (this.y > canvas.height / 2 + lane * this.hRadius * 2 - this.hRadius)
    );
  }

  drawToContext(ctx, dragging) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#fff';
    if (!this.isShadow) {
      ctx.fillRect(
        this.x - this.wRadius, this.y - this.hRadius,
        2 * this.wRadius, 2 * this.hRadius);

      if (__DEV__) {
        if (dragging && this.collisionType === COLLISION_LEFT) {
          ctx.fillRect(
            this.x - this.wRadius, this.y - this.hRadius,
            this.wRadius, this.hRadius * 2);
        } else if (dragging && this.collisionType === COLLISION_RIGHT) {
          ctx.fillRect(
            this.x, this.y - this.hRadius,
            this.wRadius, this.hRadius * 2);
        }
      }
    }

    ctx.strokeRect(
      this.x - this.wRadius, this.y - this.hRadius,
      2 * this.wRadius, 2 * this.hRadius);
  }
}
