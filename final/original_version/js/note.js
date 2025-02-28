var indexnow = 0
var delbutton = [] // 存放所有刪除按鈕
/** */
/**
 * 
 * @param {number} note 多少個 note
*/
var genNote = (note) => {
        // 每個筆記需要有獨一無二的編號
        indexnow++       
    
        // 產生一張筆記
        let $col = $('<div>').addClass('col').attr('id',indexnow)

        let $card = $('<div>').addClass('card').addClass('mb-4').addClass('shadow-sm').appendTo($col)
        
        let $cardheader = $('<div>').addClass('card-header').appendTo($card)
        // 日期
        let $title = $('<h4>').addClass('my-0').addClass('fw-normal').appendTo($cardheader)
        
        let $cardbody = $('<div>').addClass('card-body').appendTo($card)
        // 食物名稱
        let $foodname = $('<h1>').addClass('card-title').addClass('pricing-card-title').appendTo($cardbody)
        // 評價
        let $evaluation = $('<small>').addClass('text-muted').appendTo($foodname)
        let $addition = $('<div>').addClass('mt-3').addClass('mb-4').appendTo($cardbody)
        // 補充
        let $additioninfo = $('<p>').addClass('').appendTo($addition)
        // 地點
        let $littlemap = $('<p>').addClass('mb-2').attr('src','').appendTo($cardbody)
        // 刪除按鈕
        let $delete = $('<button>').addClass('w-100').addClass('btn').addClass('btn-lg').addClass('btn-outline-dark').attr('type','button').attr('id',indexnow).appendTo($cardbody)
        
        $('div#notebookpage').append($col)

        delbutton.push($delete)
                
}

$(() => {

    // 當「寫下筆記」按鈕被按到時執行
    $('button#writeitdown').on('click', () => {

        let mydate = new Date()
        let year = mydate.getFullYear() //獲取完整的年份(4位,1970以後)
        let month = mydate.getMonth() + 1 //獲取當前月份(0-11,0代表1月)
        let date = mydate.getDate() //獲取當前日(1-31)
        let today = [year,'年',month,'月',date,'日的筆記'].join("")  

        let foodname = $('#inputfoodname').val()
        let restaurant = $('#inputwhere').val()
        let address = $('div.gm-style-iw-d').find('div').text() // 還沒找到地點的經緯度，但找到地址了XD
        let evaluation = $('input[name="inlineRadioOptions"]:checked').val()
        let information = $('#inputextra').val()
        
        genNote(1)
        
        $('div#'+indexnow).find('h4').text(today)
        $('div#'+indexnow).find('h1').text(foodname).append( "<small class='text-muted'> "+"/ "+evaluation+"</small>")
        $('div#'+indexnow).find('p').text(information)
        $('div#'+indexnow).find('p.mb-2').text(restaurant).append("<small class='text-muted'> －"+address+"</small>")
        $('div#'+indexnow).find('button').text("刪除這個筆記")

        // 按到刪除按鈕時
        for (let i in delbutton) {
            delbutton[i].on('click',()=>{ 
                delbutton[i].parent().parent().parent().remove()
            })
        }
        
        // 清除表單
        $('#inputfoodname').val("")
        $('#inputwhere').val("")
        $('div.gm-style-iw-t').remove() 
        $('#inputextra').val("")
    })
      
    $('a#login').on('click', () => {
        alert("功能尚未開放><")
    })

})