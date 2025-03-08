class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    norm() {
        let length = Math.sqrt(this.x * this.x + this.y * this.y);
        if (length > 0) {
            this.x /= length;
            this.y /= length;
        }
        return this;
    }

    setAngleDeg(angle) {
        let rad = angle * Math.PI / 180;
        let length = this.length();
        this.x = Math.cos(rad) * length;
        this.y = Math.sin(rad) * length;
        return this;
    }

    setLength(length) {
        let angle = this.angle();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
        return this;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    angle() {
        return Math.atan2(this.y, this.x);
    }

    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }
}
