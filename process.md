## Violent Crime and Other Societal Variables

### Basic Info
* Joseph Ditton - jditton.atomic@gmail.com - A01249280
* Chris Higgs - higgsch@yahoo.com - A01683315
* Nick Benoit - nick.benoit14@gmail.com - A01961230

#### [Project Link](https://github.com/higgsch/CS5890-Project)


### Background and Motivation
<!-- Discuss your motivations and reasons for choosing this project, especially any background or research interests that may have influenced your decision. -->

The rights to Life, Liberty and the Pursuit of Happiness are listed as unalienable rights by the founding documents of our nation. These ideals are central tenants of our governance as well as our being cornerstones of our modern society at large. Violent crime is universally negative for all involved, and in direct opposition to these fundamental and founding ideals of our nation. As such, lowering violent crime rates is inherently in the interest of all members of our society.

Violent crime is bad for both victims as well as perpetrators. There are not many topics as widely popular as the idea of generally reducing the amount of total violent crime. Finding this kind of common goal that can be shared by everyone is especially important in a time where where finding political common ground seems tenuous and rocky at best.

Relationships found through visualizing our high dimensional data will not be likely causal. We will not have methods or the tools necessary to assess which variables cause violent crime versus which tend to correlate with violent crime. Even though, understanding some of these relationships helps to provide a small insight into what is otherwise a complicated metric that is not easily manipulated directly.  

Understanding how other social variables correlate with violent crime rates can improve the surface area that both policy makers, police departments, and concerned citizens have to work with in their effort to reduce violent crime rates in their own communities. Some societal metrics, violent crime rate for example, are not easily directly manipulated from a policy standpoint. Others though, like public school funding for instance, are much more easily modified by public interests. We hope to help educate and enable both private citizens and public institutions to reduce their own violent crime rates for the benefit of all.


### Project Objectives
<!-- Provide the primary questions you are trying to answer with your visualization. What would you like to learn and accomplish? List the benefits.-->


Our primary focus is to determine which other social variables are the most clearly and strongly related to violent crime rate. Successfully completing this goal requires the completion of our other milestone goals of first identifying interesting social metrics to study, as well as to develop intuitive and useful methods of visualizing this high dimensional data.

An ideal outcome would be to produce a visualization that communicates a set of societal measures that tend to have a strong relationship with the violent crime rate. This visualization could be distributed to concerned citizens, policy makers, or even police departments to aid and inform their decision making processes.

The above is of course contingent upon producing a high quality visualization that can be both useful for experts and lay people. The accessibility to lay people is especially important with our stated goal of attempting to inform not just professionals, but also concerned citizens at large.

Even the most fantastic visualization will fall flat assuming we are not able to choose sufficiently applicable and interesting datasets to compare to violent crime rates. This is an exploratory project, so there is of course no guarantee that our findings will be as compelling as we may hope.


### Data
<!-- From where and how are you collecting your data? If appropriate, provide a link to your data sources. -->

The most important aspect our project is violent crime data. Without comprehensive and accurate violent crime data, our comparisions to other datastets would be nearly worthless. Our research eventually directed us towards an FBI dataset, [Uniform Crime Reporting Statistics](https://www.ucrdatatool.gov). This gives us violent crime data broken down by crime with the historical and spatial variables we require.

Our hunt for datasets to compare with the above violent crime data is not yet finished. In essence, any dataset that might reflect upon the public at large and also includes a spatial component is a potential candidate for exploration. We plan to cast a somewhat wide net as far as compared datasets are concerned, this in hopes that we will discover some non-obvious and interesting relationships between unexpected societal measures and violent crime.

We are currently searching for datasets that contain the following: historic minimum wage by state, historic unemployment by state and county, historic median wage by state and county, historic public school expenditure per student. We plan to construct our visualization in such a way that we can add easily add new dimensions as we find datasets or think of new and interesting variables.


### Data Processing
<!--Do you expect to do substantial data cleanup? What quantities do you plan to derive from your data? How will data processing be implemented? -->

The primary requirement for our data is that it be at least labeled by state. We could conceivably still consider a national aggregate if it was of sufficient interest over time. In some cases we hope to consider data by city or county, especially if the dataset is of high enough spatial variability within a state.

Many of the datasets we use will likely be already labeled by state. Most of the data processing work will likely be when we attempt to investigate variability within a state. Our violent crime data is grouped by the police force or sheriff's office that reported. This will require a somewhat significant one time effort for every state to map between police departments and either cities or counties. This also presents aggregation challenges where different agencies have overlapping jurisdictions. For instance, the Logan Police Department operates entirely within the jurisdiction of the Cache County Sheriff's Office. Luckily this mapping will only be required once for every state we hope to analyze at a sub-state level.

The above process could potentially be automated with the utilization of some sort of physical address lookup service. For our purposes this will likely be a largely manual process that will be conducted for only a handful of states that are of particular interest. Many of the datasets we find will likely not even include data at a granular enough level to necessitate sub-state visualization.


### Visualization Design
<!--How will you display your data? Provide some general ideas that you have for the visualization design. Develop three alternative prototype designs for your visualization. Create one final design that incorporates the best of your three designs. Describe your designs and justify your choices of visual encodings. We recommend you use the Five Design Sheet Methodology (Links to an external site.)Links to an external site.. -->

The primary goal of visualizing the relationship between different societal measureas and the violent crime rate is to make obvious trends and correlations for both policy makers and lay-people alike. We will utilize several visualizations simultaneously to help give context, as well as to provide an interface for a user to view a more specific set of data. The primary components of our visualization will be a map that includes each state in the United States encoded to show the violent crime rate, as well as a parallel coordinate chart that shows how all of the available variables relate to each other.

On the scale of the entire country, it would be really interesting to be able to quickly select a state from the map and immediately visualize a large number of societal variables. For example, we currently plan to display violent crime rate, unemployment rates, median wage, and public school funding in a parellel coordinates chart.
![Parallel Coordinate Chart Example](https://raw.githubusercontent.com/higgsch/CS5890-Project/master/parallel.jpg?token=AI8tL09EfEatFs2Bgg8hIlMRfwP2nz71ks5b6YmIwA%3D%3D)

A parallel coordinates chart enables a user to quickly view many variables and potentially further filter them to gain a more clear understanding of particular relationships of interest.

The parallel coordinate chart would additionally include brushing to select multiple states and for the user to rearrange the columns to show different relationships. For states of particular interest to us, Utah for instance, we may invest extra effort to provide a county by county view in the map if we find a dataset with enough county by county variability to make that view of the data worth while.

Our violent crime rate data is based on reported incidents and types of violent crime on a national, state, and city level (via police department). This could be visualized by a line chart where year is the x axis and violent crimes reported is the y. You could then expand that graph to show the line for each state, you could expand it even further to show a department by department trend for each state (likely just one at a time). The graph will likely not fully remove the out of context data like a more traditional semantic zoom would, but it would make these lines more transparent to limit the degree to which it was a distraction. In addition, it would color the active data to highlight its importance. This would support comparing an individual police department to the national or state trend without further interaction. ![Line Image](https://raw.githubusercontent.com/higgsch/CS5890-Project/master/line.jpg?token=AKjatOXOz2yQVtWy4r2sBz3xbKuNtNhxks5b6aGvwA%3D%3D)
![Expanded Line Image](https://raw.githubusercontent.com/higgsch/CS5890-Project/master/line_expanded.jpg?token=AKjatA7RBUUH068WlAva2YmBRQihUTEfks5b6aHnwA%3D%3D)  

Violent crime rate would be displayed on the national map by determining the saturation level of each state on the map. The user could select a state to see different crime statistics for that particular state, as well as to show the above described parallel coordinate chart. ![Map Image](https://raw.githubusercontent.com/higgsch/CS5890-Project/master/map.jpg?token=AKjatDb8W0rFfbwKDVPMCDSnTNBcFyfmks5b6aIdwA%3D%3D)

After a state had been selected, the user could brush to select a single, or multiple years. This would present the user with aggregations based upon the selected timeframe. These aggregations will be implemented with a stacked bar chart combined with a grouped bar chart to see how total violent crime rate breaks down into more specific type of crime.
![Stacked Bar Chart Example](https://raw.githubusercontent.com/higgsch/CS5890-Project/master/stacked_bar.jpg?token=AKjatItJYpOFULoormByvZQQyzJ-hqcgks5b6aFawA%3D%3D)
![Bar Chart Example](https://raw.githubusercontent.com/higgsch/CS5890-Project/master/bar.jpg?token=AI8tLxPcyGgDgFXl6l050WGUbCa5oSJAks5b6YnEwA%3D%3D)

A sketch of our overall design is as follows:
![Design Image](https://raw.githubusercontent.com/higgsch/CS5890-Project/master/design.jpg?token=AKjatNlohyrTX_BTLbME9oREjzFBl0eZks5b6aJGwA%3D%3D)


### Must-Have Features
<!-- List the features without which you would consider your project to be a failure. -->
* Parallel Coordinates
  * Attribute Reordering. Without it the visualization is mostly worthless
  * Attribute Identification & Scales. This speaks for itself.
* Line Chart
  * Legend & Axes Scales. This speaks for itself.
* Map
  * Legend, State Codes, & Values. This speaks for itself.
  * State Statistics in Tooltip or Details Pane. Semantic zoom is not necessary but will be listed as an optional feature. The tooltip  or Details Pane approach would be simpler to implement and would be similar in effectiveness (although not as nice).


### Optional Features
<!-- List the features which you consider to be nice to have, but not critical. -->

* Parallel Coordinates
  * State-wise Brushing. We really wanted to list this under must-have features, but realized that brushing is a form of data identification and hope that state-wise trends would be correlated between most states. Thus we feel brushing as a non-critical but super nice feature to have.
  * County-by-county Display. If we can find complete county datasets, it would be nice to display county trends upon state selection.
* Line Chart
  * Chart Expansion. It would be nice to display the smaller datasets that we have found, but they may not contribute more than the global trend would. We will have to see when we look at the data.
  * Brushing along with Parallel Coordinates. If Parallel Coordinates are brushed, then this chart should also be brushed; similarly, it wouldn’t make sense to brush this chart if Parallel Coordinates are not brushed.
* Map
  * Semantic Zoom instead of Tooltip or separate pane. It would be awesome to be able to semantically zoom in on a state within the map to display its statistics instead of using a tooltip (which would be large and would naturally occlude some data).
  * Brushing to drive brushing in other charts.
* Stacked Bar Chart & Grouped Bar Chart
  * These two charts are nice to have features, they provide additional representation of certain data. They would be implemented after the shared brushing between the other visualizations.


### Project Schedule
<!-- Make sure that you plan your work so that you can avoid a big rush right before the final project deadline, and delegate different modules and responsibilities among your team members. Write this in terms of weekly deadlines. -->

* By 9 Nov
  * Data analysis
  * Data cleaning (if any), both pre-processing and in code.
* By 16 Nov
  * Map Display
  * Parallel Coordinates
* By 23 Nov (19 Nov - Prototype)
  * Line Chart
  * State Statistics for Map
* By 30 Nov - Additional/Optional Tasks (Final Submission)
  * State-wise Brushing
  * Both Bar Charts
  * Line Chart Expansion
  * Semantic Zoom in Map
  * Parallel Coordinates by County
