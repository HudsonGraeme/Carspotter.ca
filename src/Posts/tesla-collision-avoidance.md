---
title: "Testing Tesla's Collision Avoidance"
date: "2017-04-22"
categories: 
  - "tesla"
---

As some of you might know, i've been attempting to hit a pedestrian with a Model S on AutoPilot for a long time now. Over the many tests i've done, i've found some pretty odd results - find them below. I would like to thank Elon Musk and Tesla Motors for their outstanding implementation of Collision Avoidance, Traffic Aware Cruise Control(TACC), AutoPilot(AP) and, of course, Automatic Emergency Braking(AEB). My main goal was to have a pedestrian force the vehicle to initiate an AEB event without driver intervention and thanks to Tesla's immaculate attention to even hidden details, this was accomplished. I also wanted to contribute useful data to help with the evolution of Tesla's safety systems.

Over the course of this post, i will refer to the car in question as 'Model S', not 'The Tesla Model S' - I could go into depth as to why, but i won't bore you. I will also use terms such as TACC, AP and AEB. These terms are declared above. Also, UI is short for User Interface - Basically the driver's display.

## Test #1

- AutoPilot slows down almost to a standstill, but shows no indication of any object in it's way. My thoughts are that the radar and camera both saw the pedestrian, but Model S didn't know what it should display the pedestrian as. As it's only programmed to show a pedestrian in the event of a Collision Avoidance instance. After the pedestrian moved out of Model S's way, the car proceeded to accelerate and then, to park behind a parked car. What's interesting is that Model S wasn't driving towards the parked car, but rather beside it. I'm guessing that when the lane markers disappeared, Model S continued straight, on it's original path. Then, when the radar and camera picked up the parked car, Model S must have thought the roadway had taken a corner, and swerved to get back into it's lane - behind that parked car. What is even more interesting is the fact that when Model S pulled behind the parked car, it displayed the car as being pulled over. In the video, there is a gradient change in colour about halfway through the parked car on the UI. This seems to indicate the side of the road. Interesting.

## Test #2

- This time, AutoPilot was not enabled. It's hard to say if Collision Avoidance actually did activate, but i'd put my money on it. The classic warning chime played over the sound system, but nothing happened as far as the UI. It appears that Model S detected the pedestrian as an object but figured out that the object was going to pose a threat to the vehicle, unlike a plastic bag, for instance. I would suggest that Tesla incorporate an unidentified object image for the UI, for instances like these. I find this extremely interesting because many times, I've thrown cardboard pedestrians, tinfoil walls and other assorted objects into the car's path and every single time, Model S proceeded to demolish the object without warning. At this point my theory is that the camera picked up the object fine, but the radar either sees through the object or finds the density of the cardboard and finds that it's not a real pedestrian or vehicle.
