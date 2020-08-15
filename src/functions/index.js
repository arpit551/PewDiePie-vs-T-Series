'use strict';
const functions = require('firebase-functions');
var axios = require('axios');
var axios1=require('axios');
var key = 'AIzaSyCj_ktSD8E8vmHOIC6T4-S8t0Jsx491BOk';

const {actionssdk} = require('actions-on-google');
const app = actionssdk({debug: true});

app.intent('actions.intent.MAIN', (conv) => {
    var urlPew = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + 'UC-lHJZR3Gqxm24_Vd_AJ5Yw' + '&key=' + key;
    var urlTseries = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + 'UCq-Fj5jknLsUf-MWSy4_brA' + '&key=' + key;
      return axios.all([
      axios.get(urlPew),
      axios.get(urlTseries)

    ])
      .then(axios.spread(function(res,res1){
        console.log('res', res.data.items[0].statistics.subscriberCount);
      var  pieSub=res.data.items[0].statistics.subscriberCount;
      var  tSub=res1.data.items[0].statistics.subscriberCount;
      var diff;
      if(pieSub>tSub){
        diff=pieSub-tSub;
         return conv.ask('<speak>  Woah!! Pewdiepie is winning by ' + diff +'. Go on 9 year old Army!!! \n'+'Total subscribers of Pewdiepie are: '+pieSub+'.\n Total subscribers of Tseries are: '+tSub+'.\n Who are you rooting for ? Pewdiepie or Tseries'+
          '</speak>');
      }
      else{
        diff=tSub-pieSub;
         return conv.ask('<speak> ' + 'Its awesome, Tseries is winning by ' + diff +'. Come on India!!! \n'+ 'Total subscribers of Tseries are: '+tSub+'.\n Total subscribers of Pewdiepie are: '+pieSub+
        '.\n Who are you rooting for ? Pewdiepie or Tseries'+  '</speak>');
      }

      }))
      .catch(err => {
        console.log('err', err);
      });

});
app.intent('actions.intent.TEXT', (conv, input) => {
  var ans=input.toLowerCase();
  if(ans==='bye'){
    return conv.close('<speak>Good Bye</speak>');
  }
  if(ans==='pewdiepie'){
     return conv.close('<speak> Ohh! according to our poll Tseries is winning!! But don\'t worry your vote can make change!!\n Go subscribe your favorite channel!\n Take care, Good Bye!'  +  '</speak>');
  }
  // if(ans==='yes'){
  //    var urlPew1= 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + 'UC-lHJZR3Gqxm24_Vd_AJ5Yw' + '&key=' + key;
  //    var urlTseries1 = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + 'UCq-Fj5jknLsUf-MWSy4_brA' + '&key=' + key;
  //     return axios1.all([
  //     axios1.get(urlPew1),
  //     axios1.get(urlTseries1)
  //
  //   ])
  //     .then(axios1.spread(function(res1,res11){
  //       pieSub1=res1.data.items[0].statistics.subscriberCount;
  //       tSub1=res11.data.items[0].statistics.subscriberCount;
  //      diff;
  //      if(pieSub1>tSub1){
  //        diff1=pieSub1-tSub1;
  //         return conv.ask('<speak>  Woah!! Pewdiepie is winning by ' + diff1 +'. Go on 9 year old Army!!! \n'+'Total subscribers of Pewdiepie are: '+pieSub1+'.\n Total subscribers of Tseries are: '+tSub1+
  //         '\n  Again Want to check who is winning the race ? Say yes for that and to quit say bye.'+ '</speak>');
  //      }
  //      else{
  //        diff1=tSub1-pieSub1;ibm
  //         return conv.ask('<speak> ' + 'Its awesome, Tseries is winning by ' + diff1 +'. Come on India!!! \n'+ 'Total subscribers of Tseries are: '+tSub1+'.\n Total subscribers of Pewdiepie are: '+pieSub1+
  //         +'\n  Again Want to check who is winning the race ? Say yes for that and to quit say bye.'+ '</speak>');
  //      }
  //     }))
  //     .catch(err => {
  //       console.log('err', err);
  //     });
  // }
  if(ans==='tseries'||ans==='t-series'||ans==='t series'){
     return conv.close('<speak> Yeah! You are right according to our poll, Tseries is winning!!\n Go subscribe your favorite channel!\n Take care, Good Bye!'
              +  '  </speak>');
  }
  if(ans!=='tseries'&&ans!=='t-series'&&ans!=='bye'&&ans!=='pewdiepie'||ans!=='t series'){
     return conv.ask('<speak> Choose between them!!'+
                  '</speak>');
  }
});
exports.myfunction = functions.https.onRequest(app);
