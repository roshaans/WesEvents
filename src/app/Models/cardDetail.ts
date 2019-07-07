
 export let card = function( name, location, who, category, date, time, description, pictureURL = '', chatNumber = 0, goingCounter =0, maybeGoingCounter = 0, id?  ) {
    this.id = id
    this.name = name
    this.location = location
    this.who = who
    this.category = category
    this.date = date
    this.time = time
    this.description = description
    this.pictureURL = pictureURL
    this.chatNumber = chatNumber
    this.goingCounter = goingCounter
    this.maybeGoingCounter = maybeGoingCounter

 }

 