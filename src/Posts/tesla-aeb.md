---
title: 'Tesla Automatic Emergency Braking'
date: '2017-04-22'
categories:
  - 'tesla'
image: _base_url_/tesla/AEB.png
---

# Tesla's Automatic Emergency Braking: Testing and Results

For quite some time now, I've been conducting experiments with a Tesla Model S on AutoPilot, specifically aiming to provoke the Automatic Emergency Braking (AEB) system using a simulated pedestrian. Throughout numerous tests, I've encountered some intriguing findings, which I'll outline below. I want to express my gratitude to Elon Musk, Tesla Motors, and their remarkable implementation of advanced safety features such as Collision Avoidance, Traffic Aware Cruise Control (TACC), AutoPilot (AP), and, of course, Automatic Emergency Braking (AEB). My primary objective was to observe how a pedestrian could trigger the AEB system without any intervention from the driver. Thanks to Tesla's meticulous attention to detail, this objective was successfully achieved, and I also hope that my data contributes to the ongoing improvement of Tesla's safety systems.

## Test #1

During this test, AutoPilot significantly decelerated, almost coming to a standstill, despite not displaying any indication of an object obstructing its path. My analysis suggests that the radar and camera sensors detected the pedestrian, but the Model S wasn't sure how to represent the pedestrian on the display. This ambiguity arises since the system is programmed to exhibit a pedestrian only in Collision Avoidance scenarios. After the pedestrian moved away, the vehicle resumed acceleration and eventually parked behind another stationary car. Interestingly, the Model S was not originally heading toward the parked car but rather driving alongside it. It seems that when the lane markers disappeared, the Model S continued straight on its previous trajectory. Subsequently, when the radar and camera identified the parked car, the Model S likely perceived a change in the road's curvature, prompting it to swerve back into its lane behind the parked vehicle. Adding to the intrigue, when the Model S positioned itself behind the parked car, the display portrayed it as if the car had been pulled over. In the video, there is a noticeable color gradient shift on the UI approximately halfway through the parked car, indicating the side of the road. Quite fascinating.

## Test #2

In this scenario, AutoPilot was not enabled. It is challenging to determine definitively if Collision Avoidance was triggered, but it seems likely. The distinct warning chime played through the sound system, but no significant changes occurred on the UI. It appears that the Model S detected the pedestrian as an object but recognized that the object posed a potential threat to the vehicle, unlike, for example, a plastic bag. I would recommend that Tesla consider incorporating an unidentified object image on the UI for similar instances. What intrigues me greatly is that on many occasions, I've placed cardboard pedestrians, tinfoil barriers, and various other objects in the car's path, and every time, the Model S proceeded to collide with the objects without any warning. At this point, my theory is that the camera effectively captures the objects, but the radar either sees through them or identifies the cardboard's density, determining it is not an actual pedestrian or vehicle.

After numerous attempts, the Model S finally engaged the brakes and brought the car to a complete stop, as expected. This outcome was not without some initial uncertainty. The accompanying video should provide a clear demonstration of these findings.

![](_base_url_/tesla/tesla-aeb.mp4)
![](_base_url_/tesla/AEB230FPS.mov)
