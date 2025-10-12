const config = { attributes: false, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList) => {
  for (const mutation of mutationList) {
   
    if (mutation.addedNodes.length > 0)
    {
        for (var i = 0; i< mutation.addedNodes.length; i++)
        {
            if (mutation.addedNodes[i].className == "activity-details-page")
            {
                console.log("found activity-details-page");
                fetch_data();
                return;
            }
        }

    }
  }
};


// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);
var navigation_container = null;
var loopcntr = 0;
while (!navigation_container){
    navigation_container = document.getElementById("navigation-container");
    loopcntr++;
}
console.log("while loops:" + loopcntr);

// Start observing the target node for configured mutations
observer.observe(navigation_container, config);

async function fetch_data() {
//setTimeout( async function() {
    window.postMessage({ from: 'myinject.js', data: {type: 'ZPageData', data: window["ZPageData"]}});

    const segments = new URL(window.location).pathname.split('/');
    var activity_id = segments.pop() || segments.pop(); // Handle potential trailing slash
    
    const data = window["ZPageData"];
    const activity_data = await getActivity(activity_id,data.sessionTokens.accessToken);
    window.postMessage({ from: 'myinject.js', data: {type: 'activity_data', data: activity_data} });

    var fitness_data = {};
    //console.log(activity_data);
    if (activity_data.fitnessData.status == "AVAILABLE") {
        fitness_data = await getFitnessData(activity_data.fitnessData.fullDataUrl,data.sessionTokens.accessToken);
    }

    window.postMessage({ from: 'myinject.js', data: {type: 'fitness_data', data: fitness_data} });    
 // }, 12000);
}


async function getActivity(activity_id, token) {
    try {
        const response = await fetch(`https://us-or-rly101.zwift.com/api/activities/${activity_id}?_fetchSnapshots=true&fetchEvent=true`,
                              {method:'OPTIONS',
                              headers: {
                                  'access-control-request-headers': 'authorization,cache-control,source,zwift-api-version',
                                  'access-control-request-method': 'GET',
                                  }
                              }
                              );
        //const resJson = await response.json();
        //console.log(resJson);
        //return resJson;
    } catch (error) {
        console.warn('getData error', error);
    }

    try {
          const response = await fetch(`https://us-or-rly101.zwift.com/api/activities/${activity_id}?_fetchSnapshots=true&fetchEvent=true`,
                                {headers: {
                                    authorization: `Bearer ${token}`,
                                    source: 'my_zwift',
                                    'zwift-api-version': 2.5
                                    }
                                }
                                );
          const resJson = await response.json();
         // console.log(resJson);
          return resJson;
      } catch (error) {
          console.warn('getData error', error);
      }

      return {};
  }

async function getFitnessData(url, token) {
    try {
          const response = await fetch(url,
                                {headers: {
                                    authorization: `Bearer ${token}`,
                                    source: 'my_zwift',
                                    'zwift-api-version': 2.5
                                    }
                                }
                                );
          const resJson = await response.json();
      //    console.log(resJson);
          return resJson;
      } catch (error) {
          console.warn('getData error', error);
      }

      return {};
  }