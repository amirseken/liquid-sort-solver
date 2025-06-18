export class Tube {
    constructor(contents, volume) {
      this.volume = volume;
      this.contents = [...contents]; // сверху вниз
    }
  
    clone() {
      return new Tube([...this.contents], this.volume);
    }
  
    topColor() {
      return this.contents[this.contents.length - 1] ?? null;
    }
  
    isFull() {
      return this.contents.length >= this.volume;
    }
  
    isEmpty() {
      return this.contents.length === 0;
    }
  
    countTopColor() {
      if (this.isEmpty()) return 0;
      const color = this.topColor();
      let count = 0;
      for (let i = this.contents.length - 1; i >= 0; i--) {
        if (this.contents[i] === color) count++;
        else break;
      }
      return count;
    }
  
    canPourInto(other) {
      if (this.isEmpty()) return false;
      if (other.isFull()) return false;
      if (other.isEmpty()) return true;
      return this.topColor() === other.topColor();
    }
  
    pourInto(other) {
      if (!this.canPourInto(other)) return 0;
      const color = this.topColor();
      const maxPour = Math.min(this.countTopColor(), other.volume - other.contents.length);
      for (let i = 0; i < maxPour; i++) {
        other.contents.push(this.contents.pop());
      }
      return maxPour;
    }
  
    isSorted() {
      if (this.isEmpty()) return true;
      return this.contents.length === this.volume && this.contents.every(c => c === this.topColor());
    }
  }
  