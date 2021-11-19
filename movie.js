// var httpRequest = new XMLHttpRequest();
var ifcreate = [false,false,false]
var adultnum = [0, 0, 0]
var childnum = [0, 0, 0]
var num = 3
var url = "https://api.themoviedb.org/3/movie/popular?api_key=877845e23233313e8824cde8f5a78fbc&language=en-US&page=1"


Vue.component('movie', {
    // props: ['movieimg', 'title', 'overview', 'id'],
    // template: `
    // <div style="width:250px"  class="card">
    //     <img class="card-img-top" style="width:100%" v-bind:src = movieimg>
    //     <div class="card-body">
    //           <h4 class="card-title">{{title}}</h4>
    //           <p class="card-text">{{overview}}</p>
    //           <button v-bind:id = "id+'child'" v-on:click = getcount(id,child) class="mybtn">Child Ticket</button>
    //           <button v-bind:id = "id+'adult'" v-on:click = getcount(id,adult) class="mybtn">Adult Ticket</button>
    //     </div>
    // </div>
    // `,
    props: ['movieobj'],
    template: `
    <div style="width:300px"  class="card">
        <img class="card-img-top myimg" style="width:100%" v-bind:src = movieobj.imgsrc>
        <div class="card-body">
              <h4 class="card-title">{{movieobj.title}}</h4>
              <p class="card-text">{{movieobj.overview}}</p>
              <button v-bind:id = "movieobj.id+'child'" v-on:click = getcount(movieobj.id,child) class="mybtn">Child Ticket</button>
              <button v-bind:id = "movieobj.id+'adult'" v-on:click = getcount(movieobj.id,adult) class="mybtn">Adult Ticket</button>
        </div>
    </div>
    `,
    data: function () {
        return {
            child: "child",
            adult: "adult"
        }
    },
    methods: {
        getcount(id, type) {
            var count = ++heading.cartnum
            if (id == "movie1") var mWhich = 1
            else if (id == "movie2") var mWhich = 2
            else var mWhich = 3
            btnComputer(mWhich, type)

        }
    },

})

var heading = new Vue({
    el: '.heading',
    data: {
        cartnum: 0
    }
})

var showmovie = new Vue({
    el: '#showMovie',
    data: {
        entries: [{
                title: "",
                overview: "",
                imgsrc: "",
                id: ""
            },
            {
                title: "",
                overview: "",
                imgsrc: "",
                id: ""
            },
            {
                title: "",
                overview: "",
                imgsrc: "",
                id: ""
            }
        ]
    },
    methods: {

    },
    mounted() {
        axios
            .get(url)
            .then(response => {
                movies = response.data.results
                for (let index = 0; index < num; index++) {
                    this.entries[index].title = movies[index].title;
                    this.entries[index].overview = movies[index].overview
                    this.entries[index].imgsrc = "https://image.tmdb.org/t/p/w185" + movies[index].poster_path
                    this.entries[index].id = "movie" + (index + 1)
                }
                //   this.aryItems = movies
                console.log(this.entries)
            })
            .catch(function (error) { // fail
                console.log(error);
            });
    }
})


// $(document).ready(function(){
//     $("#summary").hide();
// });

var totalA = 0
var totalC = 0

function btnComputer(mWhich, type) {
    for(let i=1;i<=num;i++){
        if(mWhich==i && ifcreate[mWhich-1]==false){
        createthTag(mWhich)
        break
        }
    }
    // $("#summary").show()
    document.getElementById('summary').style.visibility = "visible"
    document.getElementById('movie' + mWhich + 'title').innerHTML = showmovie.entries[mWhich - 1].title
    if (type == 'child') {
        childnum[mWhich - 1] += 1
        document.getElementById('movie' + mWhich + 'cNump').innerHTML = childnum[mWhich - 1] + ' X $3.99'
 
        if (document.getElementById('movie' + mWhich + 'cNump').innerHTML != "" && document.getElementById('lessc' + mWhich) == null) {
            document.getElementById('movie' + mWhich + 'cNum').innerHTML += "<img src='less.png' id='lessc" + mWhich + "'>";
            document.getElementById('lessc' + mWhich).addEventListener('click', function () {
                less(mWhich, "cNum")

            })
        }
        totalC += 3.99

    } else {
        adultnum[mWhich - 1] += 1
        document.getElementById('movie' + mWhich + 'aNump').innerHTML = adultnum[mWhich - 1] + ' X $6.99'
        if (document.getElementById('movie' + mWhich + 'aNump').innerHTML != "" && document.getElementById('lessa' + mWhich) == null) {
            document.getElementById('movie' + mWhich + 'aNum').innerHTML += "<img src='less.png' id='lessa" + mWhich + "'>";
            document.getElementById('lessa' + mWhich).addEventListener('click', function () {
                less(mWhich, "aNum")
            })
        }
        totalA += 6.99
    }
    var subtotal = (adultnum[mWhich - 1] * 6.99 + childnum[mWhich - 1] * 3.99).toFixed(2)
    document.getElementById('movie' + mWhich + 'total').innerHTML = '$' + subtotal
    document.getElementById('movie' + mWhich + 'btn').innerHTML = "<button id='btnremove'+mWhich>Remove</button>"
    if (totalA != 0)
        document.getElementById('totalA').innerHTML = "Adult Subtotal: " + totalA.toFixed(2)
    if (totalC != 0)
        document.getElementById('totalC').innerHTML = "Children Subtotal: " + totalC.toFixed(2)

}

function less(mWhich, type) {
    heading.cartnum--
    var id = 'movie' + mWhich + type
    if (type == "cNum") {
        childnum[mWhich - 1]--
        totalC -= 3.99
        if (childnum[mWhich - 1] != 0) {
            document.getElementById(id + 'p').innerHTML = childnum[mWhich - 1] + ' X $3.99'

        } else{
        document.getElementById(id+'p').innerHTML =""
        var obj = document.getElementById('lessc'+mWhich);
        var imgParent = obj.parentNode;
        imgParent.removeChild(obj);}
    } else {
        adultnum[mWhich - 1]--
        totalA -= 6.99
        if (adultnum[mWhich - 1] != 0) {
            document.getElementById(id + 'p').innerHTML = adultnum[mWhich - 1] + ' X $6.99'

        } else{
            document.getElementById(id+'p').innerHTML =""
            var obj = document.getElementById('lessa'+mWhich);
            var imgParent = obj.parentNode;
            imgParent.removeChild(obj);
        }
    }
    var subtotal = (adultnum[mWhich - 1] * 6.99 + childnum[mWhich - 1] * 3.99).toFixed(2)
    if (subtotal == 0)
        removeTag(mWhich)
    else
        document.getElementById('movie' + mWhich + 'total').innerHTML = '$' + subtotal

    if (totalA > 0.1)
        document.getElementById('totalA').innerHTML = "Adult Subtotal: " + totalA.toFixed(2)
    else
        document.getElementById('totalA').innerHTML = ""
    if (totalC > 0.1)
        document.getElementById('totalC').innerHTML = "Children Subtotal: " + totalC.toFixed(2)
    else
        document.getElementById('totalC').innerHTML = ""
    if (totalA < 0.1 && totalC < 0.1)
        document.getElementById('summary').style.visibility = "hidden"

}


function createthTag(mWhich) {
    var trtag = document.createElement('tr')
    trtag.setAttribute('id', "movies" + mWhich)
    document.getElementById('tableBody').appendChild(trtag)
    var aryid = ['movie' + mWhich + 'title', 'movie' + mWhich + 'aNum', 'movie' + mWhich + 'cNum', 'movie' + mWhich + 'total', 'movie' + mWhich + 'btn']
    for (let i = 0; i < 5; i++) {
        var thtag = document.createElement('th')
        thtag.setAttribute('id', aryid[i])
        if (mWhich == 1)
            document.getElementById('movies1').appendChild(thtag)
        else if (mWhich == 2)
            document.getElementById('movies2').appendChild(thtag)
        else
            document.getElementById('movies3').appendChild(thtag)
        if (i == 1 || i == 2) {
            var ptag = document.createElement('span')
            ptag.setAttribute('id', aryid[i] + 'p')
            document.getElementById(aryid[i]).appendChild(ptag)
        }
    }
    document.getElementById('movie' + mWhich + 'btn').addEventListener('click', function () {
        removeTag(mWhich)
        removeNum(mWhich)
    })
    for(let i=1;i<=num;i++){
        if(mWhich==i) {
            ifcreate[mWhich-1] =true
            break
        } 
    }
}

function removeTag(mWhich) {
    var obj = document.getElementById("movies" + mWhich);
    var imgParent = obj.parentNode;
    imgParent.removeChild(obj);
    for(let i=1;i<=num;i++){
        if(mWhich==i) {
            ifcreate[mWhich-1] =false
            break
        } 
    }
}

function removeNum(mWhich) {
    var childN = childnum[mWhich - 1]
    var adultN = adultnum[mWhich - 1]
    childnum[mWhich - 1] = 0
    adultnum[mWhich - 1] = 0
    heading.cartnum = heading.cartnum - (childN + adultN)
    totalA -= adultN * 6.99
    totalC -= childN * 3.99
    if (totalA >= 0.1)
        document.getElementById('totalA').innerHTML = "Adult Subtotal: " + totalA.toFixed(2)
    else
        document.getElementById('totalA').innerHTML = ""
    if (totalC >= 0.1)
        document.getElementById('totalC').innerHTML = "Children Subtotal: " + totalC.toFixed(2)
    else
        document.getElementById('totalC').innerHTML = ""
    if (totalA < 0.1 && totalC < 0.1)
        document.getElementById('summary').style.visibility = "hidden"
}