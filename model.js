class Block {
    constructor(coordinate, width, mass, velocity, c1, file) {
        this.x = coordinate;
        this.location = coordinate;
        this.width = width;
        this.velocity = velocity;
        this.mass = mass;
        this.c1 = c1;
        this.file = file;
    }

    reverse() {
        this.velocity *= -1;
    }

    recalcVelocity(reason) {
        return ((2 * reason.mass * reason.velocity) + this.velocity * (this.mass - reason.mass)) / (this.mass + reason.mass);
    }

    isWall() {
        return this.x <= 0;
    }

    isCollide(reason) {
        return !(this.x + this.width < reason.x || this.x > reason.x + reason.width);
    }

    update() {
        this.x += this.velocity;
    }

    move() {
        this.location = this.x;
    }

    build() {
        image(this.file, constrain(this.location, this.c1, width), height - this.width, this.width, this.width);
    }
}