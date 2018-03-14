# hashcode-2018-qualification
In the **Google Hash Code 2018** qualification round I've been part of the *Spettri Disciolti* team, from Alghero, Italy.

Unfortunately, being it our first experience, we took some bad choices, and when the deadline came our code was still buggy.
Our solution in the regular qualification round only came in 737th place.

The *master* branch of this repo is a debugged and simplified version of our original solution.
If submitted during the regular round, this solution would have scored **49.288.754** points and put us in the **52rd** position of the global scoreboard (and 1st in Italy).

The *optimized_c* branch implements a small optimization for the C scenario, which would have granted us an extra 17.789 points, for a new total of **49.306.543** and an hypotethical **38th** place in the global scoreboard.

For further details about our #HashCode experience, you can check my Facebook post here: https://www.facebook.com/ing.ivan.naitana/posts/1608756422548988

## Usage
This version of the code is written in node.js, and the most complex scenario (E) takes 2.5 seconds to complete.

Just run the main.js script, with the initial of the chosen scenario as an argument.

Example:

    nodejs main.js a


## Possible optimizations
The A, B and E scenarios are already fully optimized and score the best theoretical score. Any further optimization should target the C and D scenarios.

Possible optimizations could include a tie-breaker rule if more then a vehicle would select the same ride as their best option, different criteria and weights to select the best ride, especially when choosing the first or last one for each vehicle, and of course many more things we didn't think of!

In the extended round we tried to employ some of these optimizations, finishing it in the 29th place with a score of 49.609.135.
