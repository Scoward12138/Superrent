$(function () {

    var socket = io('ws://localhost:8081');

    var uname = null;

    var upassword = null;

    //hashcode function
    function hashcode(str) {
        var hash = 0,
            i, chr, len;
        if (str.length === 0) return hash;
        for (i = 0, len = str.length; i < len; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    $('.login-btn').click(function () {

        uname = $.trim($('#loginName').val());
        upassword = $.trim($('#loginPassword').val());
        if (uname && upassword) {

            socket.emit('login', {
                username: uname,
                password: upassword
            })
        } else {
            alert('Please enter your name and password')
        }
    })

    $('.NewUser-btn').click(function () {
        uname = $.trim($('#NewName').val());
        upassword = $.trim($('#NewPassword').val());
        uadd = $.trim($('#NewAddress').val());
        upn = $.trim($('#NewPhoneNum').val());
        udl = $.trim($('#driversLicense').val());
        socket.emit('NewUser', {
            username: uname,
            password: upassword,
            cellnum: upn,
            address: uadd,
            driverlicense: udl
        })
    })

    $('.return-btn').click(function () {
        ud = $.trim($('#date').val());
        utype = $.trim($('#type').val());
        urentid = $.trim($('#returningcar').val());
        uphone = $.trim($('#phoneNum').val());
        utime = $.trim($('#time').val());
        socket.emit('returncar',{
            type : utype,
            date : ud,
            rentid : urentid,
            phoneNum : uphone,
            time : utime
        })
    })

    socket.on('reserve process', function (data) {
        socket.emit('reserve-info',{
            fdate : data.fdate,
            ftime : data.ftime,
            ttime : data.ttime,
            tdate : data.tdate,
            vtName : data.type
        })
    })

    $('.search-btn').click(function () {
        ufd = $.trim($('#fdate').val());
        utd = $.trim($('#tdate').val());
        uftime = $.trim($('#ftime').val());
        uttime = $.trim($('#ttime').val());
        ulocation = $.trim($('#l').val());
        utype = $.trim($('#g').val());
        socket.emit('search', {
            type: utype,
            fdate: ufd,
            ftime: uftime,
            tdate: utd,
            ttime: uttime,
            location: ulocation
        })
    })

    $('.re-btn').click(function () {
        uyn = $.trim($('#yn').val());
        uyt = $.trim($('#yt').val());
        uypn = $.trim($('#ypn').val());
        socket.emit('finalstep', {
            phoneNum : uypn,
            name : uyn,
            type : uyt,
            hashcode : hashcode(uyn)
        })
    })

    $('.gdr-btn').click(function () {
        udate = $.trim($('#daily').val());
        socket.emit('gdr', {
            date: udate
        })
    })

    socket.on('loginSuccess', function (data) {
        if (data.username === uname) {
            if (data.username == 'admin') {
                clerkcheckin(data)
            } else {
                customercheckin(data)
            }
        } else {
            alert('try again pls')
        }
    })

    function clerkcheckin(data) {
        window.open('report.html')
    }

    function customercheckin(data) {
        window.open('search.html')
    }

    socket.on('loginSuccess', function (data) {
        if (data.username === uname) {
            checkin(data)
        } else {
            alert('try again pls')
        }
    })


    socket.on('loginFail', function () {
        alert('password not correct')
    })

    socket.on('NotNewUser', function () {
        alert('User already created')
    })

    socket.on('NPpls', function () {
        alert('Please enter both name and password to register')
    })

    socket.on('register fail', function () {
        alert('Please re-enter ur information')
    })

    socket.on('not rented', function () {
        alert('pls re-enter date/rentid/type information of the car.')
    }) 
    socket.on('return completed', function () {
        alert('return compeleted')
    })
    socket.on('no such a car',function(){
        alert('your desired vehicle is not available at this time')
    })
    
    socket.on('confirmation',function(data){
        alert('interval:'+data.interval+'; dayRate:'+data.dayRate+'; total fee after calculation:'+data.fee)
        window.open('reserve.html')
    })

    socket.on('confre', function (data) {
        alert('Return process compeleted, interval:' + data.interval + '; dayRate:' + data.dayRate + '; total fee after calculation:' + data.fee)

    })

    socket.on('name is not important',function(data){
        alert('Reservation Completed! Your Confirmation Number:'+ data)
    })

    socket.on('enter date',function(){
        alert('no vehicle rented on the given date')
    })

    socket.on('reportinfo', function (data) {
        alert('suv:'+data.suv+'; compact:'+data.compact+'; economy:' +data.economy +'; fullsize:'+data.fullsize+'; midsize:' +data.midsize+'; truck:' +data.truck+'; standard:'+data.standard);
    })
    
    socket.on('phonere',function(){
        alert('pls re-enter your phone number')
    })

    socket.on('abc', function () {
        alert('the car is already returned')
    })

    socket.on('register success', function(){
        alert('register succeeded')
    })
})