/*app.js*/
var app = require('http').createServer()
var io = require('socket.io')(app);
var PORT = 8081;

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'superrent'
});

connection.connect();
console.log("connected!")

var name = 'john';
var password = '0';
console.log(name);

app.listen(PORT);
io.on('connection', function (socket) {

    var isNewPerson = true;

    var username = null;

    var password = null;

    var isRightPassword = false;

    var oneCorrect = false;

    socket.on('login', function (data) {


        connection.query('SELECT * from customer where name=' + "'" + data.username + "' AND password =" + "'" + data.password + "'"  , function (err, rows, fields) {
            if (rows.length != 0){
                socket.emit('loginSuccess', data)
                oneCorrect = true;
            } else {
                 socket.emit('loginFail', '')
            }
            if (!err)
                console.log('The solution is: ', rows);
            else
                console.log('Error while performing Query.');
        });
    })

    socket.on('NewUser', function (data) {
        if (data.name != "" && data.cellnum != "" && data.driverlicense != "" && data.password != "" && data.address != "") {
            connection.query("INSERT INTO `customer`(`cellNum`, `name`, `address`, `driversLicense`, `password`) VALUES" + "('" + data.cellnum + "','" + data.username + "','" + data.address + "','" + data.driverlicense + "','" + data.password + "')", function (err, rows, fields) {
                if (!err){
                    console.log('The solution is: ', rows);
                    socket.emit('register success');
                }else{
                    console.log('Error while performing Query.');
            }});
        } else {
            socket.emit('register fail', '')
        }
    })

    // socket.on('search', function (data) {
    // console.log('SELECT * from vehicle where model =' + "'" + data.g + "' AND status = 'avaliable' AND location =" + "'" + data.l + "'");
    //     connection.query('SELECT * from vehicle where model =' + "'" + data.g + "' AND status = 'avaliable' AND location =" + "'" + data.l + "'", function (err, rows, fields) {
    //         if(rows.length != 0){    
    //         console.log('<div class="search-per-car">' +
    //             '<h5> Car id:' + rows[0].id + '</h5>' +
    //             '<h5> Location:' + rows[0].location + '</h5>' +
    //             '<h5> status:' + rows[0].status + '</h5>' +
    //             '<h5> model:' + rows[0].model + '</h5>' +
    //             '<h5> vlicence:' + rows[0].vlicence + '</h5>' +
    //             '<h5> year:' + rows[0].year + '</h5> <button class = "confirm-btn" > Confirm </button> </div>');
    //         socket.emit('return',rows[0]);

    // socket.on('return',function (data){
    //     console.log(data);
    //     connection.query('SELECT * from rent where rentid ='+"'"+ data.rentid + "'", function (err, rows, fields){
    //          if (!err)
    //              console.log('The solution is: ', rows[0]);
    //          else
    //              console.log('Error while performing Query.');

    //         if (rows.length != 0){
    //             //console.log("INSERT INTO `returncar`(`date`, `odometer`, `fullTank`, `value`, `time`, `rentid`) VALUES " + "('" + data.date + "', '" + data.odometer + "', '" + data.fullTank + "', '" + data.value + "', '" + data.time +"', '" + data.rentid + "')")
    //             connection.query("INSERT INTO `returncar`(`date`, `odometer`, `fullTank`, `value`, `time`, `rentid`) VALUES" + "('" + data.date + "','" + data.odometer + "','" + data.fullTank + "','" + data.value + "','" + data.time +"','" + data.rentid + "')", function (err, rows, fields) {
    //                 if (!err)
    //                     socket.emit('return completed','');
    //                 else
    //                     console.log('Error while performing Query.');
    //             })
    //         } else{
    //             socket.emit('not rented','');
    //         }

            
    //     })
    
    // })

    socket.on('search',function(data){
        //console.log(data);
        //console.log(data.fdate);
        //console.log('SELECT * from vehicle where model=' + "'" + data.type + "'AND location = " + "'" + data.location + "'AND status = 'avaliable'");
        connection.query('SELECT * from vehicle where model=' + "'" + data.type + "'AND location = " + "'" + data.location + "'AND status = 'avaliable'"  , function (err, rows, fields){
            if (!err){
                //console.log('The solution is: ', data);
                if (rows.length != 0 && data.fdate != "" && data.tdate != "") {
                    socket.emit('reserve process',data);
                } else {
                    socket.emit('no such a car','');
                }
            } else{
                console.log('Error while performing Query.');
            }
        })
    })

    socket.on('reserve-info', function (data) {
        console.log(data);
        connection.query('SELECT * from vehicletype where vtName=' + "'" + data.vtName + "'", function (err, rows, fields) {
            if (!err){
                //console.log('The solution is: ', rows[0]);
                var fd = parseInt(data.fdate);
                var td = parseInt(data.tdate);
                var interval = (td - fd);
                var dayRate = parseInt(rows[0].dayRate);
                var fee = dayRate*interval
                console.log(fee);
                socket.emit('confirmation', {
                    interval,
                    dayRate,
                    fee
                });
            } else{
                console.log('Error while performing Query.');
            }
        })
    })

    socket.on('returncar', function (data) {
        console.log(data);
        var confNum = '';
        var fd = 0;

        if (data.phoneNum !=0 && data.date !=0 && data.rentid != 0 && data.type != 0){
        connection.query('SELECT * from reservation where phoneNum=' + "'" + data.phoneNum +"'",function(err, rows, fields){
            if (!err){
                console.log('The solution is: ', rows[0]);
                confNum = rows[0].ConfNum;
                console.log(confNum);
            }else{
                console.log('Error while performing Query.');
                socket.emit('phonere','')
        }})

        connection.query('SELECT * from rent where rentid =' +"'"+data.rentid+"'", function(err,rows,fields){
            if (!err && rows.length != 0){
                console.log('The solution is: ', rows);
                
                fd = rows[0].rentdate;
                console.log(rows[0].carreturn)
                
                if(rows[0].carreturn != "returned"){
                connection.query('SELECT * from vehicletype where vtName=' + "'" + data.type+ "'", function (err, rows, fields) {
                    console.log("ok");
                    if (!err&&rows.length!=0) {
                        console.log('The solution is: ', rows[0]);
                
                        var td = parseInt(data.date);
                        var interval = (td - fd);
                        var dayRate = parseInt(rows[0].dayRate);
                        var fee = dayRate * interval
                        console.log(fee);
                        var time = "0000";
                        if(data.time != ""){
                            time = data.time
                        }
                        connection.query("INSERT INTO `returncar`(`date`, `phoneNum`, `type`, `fee`, `time`, `rentid`) VALUES" + "('" + data.date + "','" + data.phoneNum + "','" + data.type + "','" + fee + "','"+ time +"','" + data.rentid + "')", function (err, rows, fields) {console.log("1")});
                        connection.query("UPDATE rent SET `carreturn` = 'returned' WHERE `rentid` =" + data.rentid, function(){})
                        socket.emit('confre', {
                            interval,
                            dayRate,
                            fee
                        });
                    } else {
                        socket.emit('not rented', '');
                    }
                })} else{
                    
                    socket.emit('abc','')
                    console.log("ll")
                }
            } else{
                socket.emit('not rented', '');
        }})} else {
            socket.emit('register fail','');
    }




    })

    socket.on('finalstep', function(data){
        //console.log('UPDATE vehicle SET `status` = "inuse" WHERE `status` = "avaliable" AND `model` =' + "'" + data.type + "' limit 1");
        connection.query('UPDATE vehicle SET `status` = "inuse" WHERE `status` = "avaliable" AND `model` =' +"'"+ data.type +"' limit 1", function (err, rows, fields){})
        connection.query('INSERT INTO `Reservation`(`ConfNum`, `name`, `phoneNum`) VALUES (' +"'"+ data.hashcode + parseInt(data.phoneNum) +"','"+ data.name +"','"+data.phoneNum+"')" , function (err, rows, fields) {
            if (!err){
                //console.log('The solution is: ', rows);
                var ConfNum = data.hashcode + parseInt(data.phoneNum)
                socket.emit('name is not important',ConfNum);
            }else{
                console.log('Error while performing Query.');
            }
        })
    })

    socket.on('gdr', function(data){
        console.log(data);
        connection.query('SELECT * FROM `rent` WHERE rentdate = ' + "'" + data.date + "'", function (err, rows, fields) {
            if (!err){
                
                if (rows.length != 0){
                    console.log('The solution is: ', rows);
                    var suv = 0;
                    var economy = 0;
                    var compact = 0;
                    var midsize = 0;
                    var truck = 0;
                    var standard = 0;
                    var fullsize = 0;
                    for (i = 0; i<rows.length; i++){
                        if(rows[i].cartype == 'suv'){
                            suv += 1;
                        }
                        if (rows[i].cartype == 'economy') {
                            economy += 1;
                        }
                        if (rows[i].cartype == 'compact') {
                            compact += 1;
                        }
                        if (rows[i].cartype == 'midsize') {
                            midsize += 1;
                        }
                        if (rows[i].cartype == 'truck') {
                            truck += 1;
                        }
                        if (rows[i].cartype == 'standard') {
                            standard += 1;
                        }
                        if (rows[i].cartype == 'fullsize') {
                            fullsize += 1;
                        }
                    }
                    console.log(suv+economy+compact+midsize+truck+standard+fullsize);
                    socket.emit('reportinfo',{
                        suv,
                        economy,
                        compact,
                        midsize,
                        truck,
                        standard,
                        fullsize
                    })
                } else {
                    socket.emit('enter date','')
                }
            }else{
                console.log('Error while performing Query.');
            }
        })
    })

    console.log('app listen at' + PORT);
    
})