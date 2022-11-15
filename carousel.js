const imgs = [
    `https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220801-LG-TV-en1.jpg`,
    `https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220801-ipads-en.jpg`,
    `https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-1026-22-P13-MVM-Wk1-en.jpeg`,
    `https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220801-summer-en.jpg`,
    `https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220801-backyard-oasis-en.jpg`

]

const descriptions = [
    `LG_TV`,
    `Apple_iPad`,
    `Member_only Savings`,
    `Sports & Fitness`,
    `Backyard Patio`
    
]
const data = {
    imgs: imgs,
    description: descriptions,
    index: 0,
    timerID: null,
    arrButtons: []
}

const objs = {
    img: document.querySelector('.carousel img'),
    btnBar: document.querySelector('.carousel .btnBar'),
    navPrev: document.querySelector('.btnNav.prev'),
    navNext: document.querySelector('.btnNav.next'),

}
const cbClick = function (evt){
    // console.log('clicked', evt.target.dataset.imgid)
    let img_id = evt.target.dataset.imgid
    console.log('type of imgid', typeof img_id)
    img_id = Number(img_id)
    console.log('type of imgid', typeof img_id)
    objs.img.src = data.imgs[img_id]
    updateSelected(img_id)
    data.index = img_id
}

const timerHandler = function (){
    data.index++
    if (data.index === data.imgs.length){
        data.index = 0
    }
    update(data.index)

}

const startAnimate = function (){
    data.timerID = setInterval(timerHandler, 5000)

}

const stopAnimate = function (){
    if (data.timerID){
        clearInterval(data.timerID)
        data.timerID = null
    }
}

const updateSelected = function (index){
    data.arrButtons.forEach(function (ele, inx){
        ele.className = ''
        if (inx === index){
            data.arrButtons[index].className = 'btnSelected'
        }
    })
    data.arrButtons[index].className = 'btnSelected'
}

const cbMouseenter = function (evt){
    debugger
    stopAnimate()
}

const cbMouseleave = function (evt){
    debugger
    startAnimate()
}

const update = function (index){
    updateSelected(index)
    objs.img.src = data.imgs[index]
}

const cbPagePrev = function (evt){
    if (data.index > 0){
        data.index--
        update(data.index)
    }
}
const cbPageNext = function (evt){
    if (data.index  < data.imgs.length - 1){
        data.index++
        update(data.index)
    }
}
const createCarousel = function (){
    objs.img.src = data.imgs[data.index]
    objs.img.addEventListener('mouseenter', cbMouseenter)
    objs.img.addEventListener('mouseleave', cbMouseleave)
    objs.navPrev.addEventListener('click', cbPagePrev)
    objs.navNext.addEventListener('click', cbPageNext)
    for (let i = 0; i < imgs.length; i++){
        let eleBtn = document.createElement('button')
        eleBtn.innerText = data.description[i]
        eleBtn.dataset.imgid = i
        eleBtn.addEventListener('click', cbClick)
        objs.btnBar.appendChild(eleBtn)
        data.arrButtons.push(eleBtn)
        if (i === data.index){
            updateSelected(i)
        }

    }
}

createCarousel()
startAnimate()