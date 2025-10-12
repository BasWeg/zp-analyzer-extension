
export async function getData(argument) {
    const cdate = Date.now();
    if (argument.type == 'profile' && argument.id){
      const id = argument.id;
      try {
          const response = await fetch(`https://zwiftpower.com/cache3/profile/${id}_all.json`).catch(err => {
            console.log(err);
          });

            if(response.status === 200){
                const resJson = await response.json();
                return resJson;
            }else{
                console.warn('response status', response.status);
            }
          //console.log(resJson);
          
      } catch (error) {
          console.warn('getData error', error);
      }
    }
    else if (argument.type == 'team'  && argument.id){
        const id = argument.id;
        try {
            const response = await fetch(`https://zwiftpower.com/api3.php?do=team_riders&id=${id}&_=${cdate}`);
            const resJson = await response.json();
            //console.log(resJson);
            return resJson;
        } catch (error) {
            console.warn('getData error', error);
        }
      }
      else if (argument.type == 'event'  && argument.id){
        const id = argument.id;
        try {
            var response = await fetch(`https://zwiftpower.com/cache3/results/${id}_view.json?_=${cdate}`);
            if (response.status == 200) {
                const resJson = await response.json();
                //console.log('view ', resJson);
                if(resJson.data.length!=0){
                    resJson.type = 'result';
                return resJson;}
            }
            response = await fetch(`https://zwiftpower.com/cache3/results/${id}_zwift.json?_=${cdate}`);
            if (response.status == 200) {
                const resJson = await response.json();
                //console.log('view ', resJson);
                if(resJson.data.length!=0){
                    resJson.type = 'result';
                return resJson;}
            }
            response = await fetch(`https://zwiftpower.com/cache3/results/${id}_signups.json?_=${cdate}`);
            if (response.status == 200) {
                const resJson = await response.json();
                //console.log('view ', resJson);
                if(resJson.data.length!=0){
                    resJson.type = 'signup';
                return resJson;}
            }

        } catch (error) {
            console.warn('getData error', error);
        }
      }
      else if (argument.type == 'event_filtered'  && argument.id){
        const id = argument.id;
        try {
            response = await fetch(`https://zwiftpower.com/cache3/results/${id}_filtered.json?_=${cdate}`);
            if (response.status == 200) {
                const resJson = await response.json();
                //console.log('view ', resJson);
                if(resJson.data.length!=0){
                    resJson.type = 'result_filtered';
                return resJson;}
            }
        } catch (error) {
            console.warn('getData error', error);
        }
      }
      else if (argument.type == 'analysis' && argument.id && argument.eventid) {
        try {
            const response = await fetch(`https://zwiftpower.com/api3.php?do=analysis&zwift_id=${argument.id}&zwift_event_id=${argument.eventid}`);
            const resJson = await response.json();
            //console.log(resJson);
            return resJson;
        } catch (error) {
            console.warn('getData error', error);
        }        
      }
      else if (argument.type == 'league'  && argument.id){
        const id = argument.id;
        try {
            const response = await fetch(`https://zwiftpower.com/cache3/global/league_standings_${id}.json?_=${cdate}`);
            const resJson = await response.json();
            //console.log(resJson);
            return resJson;
        } catch (error) {
            console.warn('getData error', error);
        }
      } 

    else if (argument.type == 'league_rider_results'  && argument.id && argument.leagueid){
      try {
          const response = await fetch(`https://zwiftpower.com/api3.php?do=league_rider_results&id=${argument.leagueid}&zwid=${argument.id}?_=${cdate}`);
          const resJson = await response.json();
          //console.log(resJson);
          return resJson;
      } catch (error) {
          console.warn('getData error', error);
      }
    } 
      
    else {
        console.error('getData: unknown type');
    }       
      return {};
      
  }



  export function generate_bin(min_boundary, max_boundary, data)
  {
    let bin_dict= {};
    for (let i = min_boundary; i <= max_boundary; i=i+0.01)
    {
        bin_dict[i.toFixed(2)] = 0;
    }
    for (var x = 0; x < data.length; x++) {

        var bin_idx = data[x].avg90Wkg1200;
        bin_dict[bin_idx] = bin_dict[bin_idx] + 1; 
    }    
    return Object.entries(bin_dict).map(([x, y]) => {return [x, y];});
  }

  export function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }
  