export interface Event {
  
  event_title?: String, 
  event_location?: String,  
  event_students?: String, 
  event_category?: String, 
  event_date?: String, 
  
  event_startTime?: String, 
  event_endTime?: String, 
  event_description?: String, 
  event_pictureURL?: String, 
  event_chatNumber?: Number, 
  event_goingCounter?: Number, 
  event_maybeGoingCounter?: Number, 
  event_creation_timeStamp?: Date ,
  event_id?: Number, 
  createdBy?: String,
  lastUpdate?: Number
}