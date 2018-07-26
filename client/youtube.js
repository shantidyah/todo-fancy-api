// const gapi = require('gapi')  

let Youtube = new Vue({
    el: "#app",
    data: {
      result: [],
      querys: "",
      user:''
  
    },
    methods: {
      searching: function () {
        console.log("masuk methods search");
        this.result = []
        gapi.client.setApiKey('AIzaSyBvizribe8dbta-KjEhM6u407xhvES7gAI');
        gapi.client.load('youtube', 'v3', function () {
          Youtube.getVideo();
        });
      },
  
  
      getVideo: function () {
        
        $('#results').empty()
        // console.log("masuk methods getvideo");
        var q = this.querys //$('#query').val();
        var request = gapi.client.youtube.search.list({
          q: q,
          part: 'snippet',
          maxResults: 20
        });
  
        request.execute(function (response) {
          console.log(response.items)
          console.log('?')
          for (let i = 0; i < response.items.length; i++) {
            Youtube.result.push(response.items[i])
            console.log(Youtube.result)
          }
        })
      },
      covertToken: function(){
        var validtoken = localStorage.getItem('tokenjwt')

        axios.get('http://localhost:3000/converttoken',{
            headers:{
                tokenjwt:validtoken
            }
        })
        .then(convert=>{
            this.user=convert.data
        })
        .catch(err=>{
            console.log(err);
        })
      }
    },
    created(){
        this.covertToken()
    }
  })