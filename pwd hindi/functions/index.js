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
         return conv.ask('<speak> Pewdiepie' + diff +'ग्राहकोा से जीत राहा है  \n'+'pewdiepie के कुल ग्राहक हैं '+pieSub+'.\ntseries के कुल ग्राहक हैं '+tSub+'.\n आप किसका समर्थन कर रहे हैं? Pewdiepie or Tseries '+
          '</speak>');
      }
      else{
        diff=tSub-pieSub;
         return conv.ask('<speak> ' + 'बहुत बढ़िया, Tseries ' + diff +'ग्राहकोा से जीत राहा है  '+'सबाश भारत \n'+ 'tseries के कुल ग्राहक हैं '+tSub+'.\n pewdiepie के कुल ग्राहक हैं '+pieSub+
        '.\n आप किसका समर्थन कर रहे हैं? Pewdiepie or Tseries'+  '</speak>');
      }

      }))
      .catch(err => {
        console.log('err', err);
      });

});
app.intent('actions.intent.TEXT', (conv, input) => {
  var ans=input.toLowerCase();
  if(ans==='अलविदा'){
    return conv.close('<speak>अलविदा!</speak>');
  }
  if(ans==='pewdiepie'){
     return conv.close('<speak> ओह! हमारे पोल के अनुसार Tseries जीत रही है !! लेकिन चिंता मत करो कि आपका वोट परिवर्तन कर सकता है! \n अपने पसंदीदा चैनल की सदस्यता लें! \n  ध्यान रखें, अलविदा!'  +  '</speak>');
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
  //        diff1=tSub1-pieSub1;
  //         return conv.ask('<speak> ' + 'Its awesome, Tseries is winning by ' + diff1 +'. Come on India!!! \n'+ 'Total subscribers of Tseries are: '+tSub1+'.\n Total subscribers of Pewdiepie are: '+pieSub1+
  //         +'\n  Again Want to check who is winning the race ? Say yes for that and to quit say bye.'+ '</speak>');
  //      }
  //     }))
  //     .catch(err => {
  //       console.log('err', err);
  //     });
  // }
  if(ans==='tseries'||ans==='t-series'){
     return conv.close('<speak> हाँ! आप हमारे चुनाव के हिसाब से सही हैं, Tseries जीत रही हैं! \n अपने पसंदीदा चैनल को सब्सक्राइब करें! \n ध्यान रखें, अलविदा!'
              +  ' </speak>');
  }
  if(ans!=='tseries'&&ans!=='t-series'&&ans!=='अलविदा'&&ans!=='pewdiepie'){
     return conv.ask('<speak> उन दोनों के बीच चुनें !!'+
                  '</speak>');
  }
});
exports.myfunctionotherlanguage = functions.https.onRequest(app);
