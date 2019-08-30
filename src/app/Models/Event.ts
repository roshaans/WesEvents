export interface Event {
  event_title?: string, 
  event_location?:string,  
  event_students?: string, 
  event_category?: string, 
  event_date?: string, 
  event_startTime?: any, 
  event_endTime?: any, 
  event_description?: string, 
  event_pictureURL?: string, 
  event_chatNumber?: Number, 
  event_goingCounter?: any[], 
  event_maybeGoingCounter?: Number, 
  event_creation_timeStamp?: any ,
  event_id?: string, 
  createdBy?: any,
  lastUpdated?: Date,
  time?: string
}