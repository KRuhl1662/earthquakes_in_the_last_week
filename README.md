
The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. 


Steps:

1. The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visiting the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page, I picked the weekly data set to use. It is fairly easy to change the set buy replacing week with month. 


2. Create circle markers to represent each earthquake using its lat/long coordinates

3. The markers will also be sized by their magnitude, I used a multiplier of 3 to each one to make the markers not only bigger but also help differentiate the magnitudes a little more.

4. Each marker is colored by its depth in a range. I made multiple sets 

   * **HINT** the depth of the earth can be found as the third coordinate for each earthquake.

   * Include popups that provide additional information about the earthquake when a marker is clicked.

   * Create a legend that will provide context for your map data.

   * Your visualization should look something like the map above.

- - -

### Level 2: More Data (Optional)

![5-Advanced](Images/5-Advanced.png)

The USGS wants you to plot a second data set on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in a second data set and visualize it along side your original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

In this step we are going to..

* Plot a second data set on our map.

* Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.

* Add layer controls to our map.

- - -

### Assessment

Your final product will be assessed on the following metrics:

* Completion of assigned tasks

* Visual appearance

* Professionalism

* Ensure your repository has regular commits (i.e. 20+ commits) and a thorough README.md file

**Good luck!**

### Copyright

Trilogy Education Services © 2019. All Rights Reserved.
