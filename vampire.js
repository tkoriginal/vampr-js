class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
    this.hasCreator.bind(this);
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  hasCreator(vam) {
    return vam.creator ? 1 : 0;
  }
  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let vam = this;
    let distance = 0 
    while (vam.creator){
      vam = vam.creator;
      distance ++;
    }
    return distance;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
   return this.numberOfOffspring > vampire.numberOfOffspring ? true : false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this.name === vampire.name) {
      return this;
    }
    const vamp1 = this;
    const findAncestors = (vamp) => {
      if (!vamp.creator) {
        return [vamp];
      }
      let ancestors = [];
      let currentCreator = vamp.creator;
      ancestors.push(currentCreator);
      while(currentCreator.creator){
        ancestors.push(currentCreator.creator)
        currentCreator = currentCreator.creator;
      }
      return ancestors;
    }
    
    let vamp1Ancestors = findAncestors(vamp1)
    let vamp2Ancestors = findAncestors(vampire);
    let matchingAncestors = [];
    vamp1Ancestors.forEach(vamp1 => {
      vamp2Ancestors.forEach (vamp2 => {
        vamp1.name === vamp2.name ? matchingAncestors.push(vamp1) : 0;
      })
    })

    return matchingAncestors[0];
  }
}

module.exports = Vampire;

