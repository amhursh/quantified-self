export { Food }

class Food {
  constructor(name, calories, id=null)
  {
    this.name = name
    this.calories = calories
    if (id) {
      this.id = id
    }
  }
}