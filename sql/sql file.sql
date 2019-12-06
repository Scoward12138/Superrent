SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


DROP TABLE IF EXISTS `branch`;
CREATE TABLE IF NOT EXISTS `branch` (
  `location` varchar(26) NOT NULL,
  `city` varchar(26) NOT NULL,
  PRIMARY KEY (`location`,`city`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


INSERT INTO `branch` (`location`, `city`) VALUES
('broadway', 'Vancouver'),
('Main Rd', 'UBC'),
('saba Rd', 'Richmond');



DROP TABLE IF EXISTS `clubmember`;
CREATE TABLE IF NOT EXISTS `clubmember` (
  `cellNum` varchar(11) NOT NULL,
  `points` int(11) NOT NULL,
  `fees` int(11) NOT NULL,
  PRIMARY KEY (`cellNum`)
) ENGINE=MyISAM AUTO_INCREMENT=2147483648 DEFAULT CHARSET=latin1;


INSERT INTO `clubmember` (`cellNum`, `points`, `fees`) VALUES
('7777777777', 13, 111),
('1111111111', 23, 453),
('2222222222', 1332, 12),
('9999999999', 341, 454),
('5636572325', 768, 9);


DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `cellNum` varchar(50) NOT NULL,
  `name` varchar(26) NOT NULL,
  `address` varchar(26) NOT NULL,
  `driversLicense` varchar(26) NOT NULL,
  `password` varchar(26) NOT NULL,
  PRIMARY KEY (`cellNum`)
) ENGINE=MyISAM AUTO_INCREMENT=2147483648 DEFAULT CHARSET=latin1;


INSERT INTO `customer` (`cellNum`, `name`, `address`, `driversLicense`, `password`) VALUES
('9999999999', 'scoward', 'ubc tallwood', 'gdfyhr54', '0'),
('1111111111', 'tim', 'richmond', 'fgrsge434', '0'),
('2222222222', 'jim', 'north vancouver', 'afreh54e', '0'),
('5636572325', 'trump', 'waltergage', 'afreh345', '0'),
('7777777777', 'john', 'richmond', 'asdhjgiuy', '0'),
('0', 'admin', '0', '0', '0');


DROP TABLE IF EXISTS `rent`;
CREATE TABLE IF NOT EXISTS `rent` (
  `cartype` varchar(26) NOT NULL,
  `carreturn` varchar(26) NOT NULL,
  `carid` varchar(26) NOT NULL,
  `rentid` varchar(26) NOT NULL,
  `rentdate` varchar(26) NOT NULL,
  PRIMARY KEY (`carid`)
) ENGINE=MyISAM AUTO_INCREMENT=10007 DEFAULT CHARSET=latin1;


INSERT INTO `rent` (`cartype`, `carreturn`, `carid`, `rentid`, `rentdate`) VALUES
('suv', 'returned', '10001', '43256', '20120111'),
('truck', 'notreturned', '10004', '43251', '20190304'),
('standard', 'notreturned', '10003', '84356', '20010309'),
('fullsize', 'returned', '10005', '13400', '20170209'),
('paypal', 'notreturned', '19996', '12300', '20191011'),
('suv', 'notreturned', '10002', '42300', '20181230');

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE IF NOT EXISTS `reservation` (
  `ConfNum` varchar(26) NOT NULL,
  `name` varchar(26) NOT NULL,
  `phoneNum` varchar(26) NOT NULL,
  PRIMARY KEY (`ConfNum`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



INSERT INTO `reservation` (`ConfNum`, `name`, `phoneNum`) VALUES
('1078771234567890', 'may', '1234567890'),
('19241469719999999999', 'scoward', '9999999999'),
('1148401111111111', 'tim', '1111111111'),
('1052302222222222', 'jim', '2222222222'),
('1106405385636572325', 'trump', '5636572325'),
('33515422341231231', 'mike', '2341231231');


DROP TABLE IF EXISTS `returncar`;
CREATE TABLE IF NOT EXISTS `returncar` (
  `date` varchar(26) NOT NULL,
  `phoneNum` varchar(26) NOT NULL,
  `type` varchar(26) NOT NULL,
  `fee` varchar(26) NOT NULL,
  `time` varchar(26) NOT NULL,
  `rentid` varchar(26) NOT NULL,
  PRIMARY KEY (`rentid`)
) ENGINE=MyISAM AUTO_INCREMENT=10008 DEFAULT CHARSET=latin1;



INSERT INTO `returncar` (`date`, `phoneNum`, `type`, `fee`, `time`, `rentid`) VALUES
('20120113', '2341231231', 'midsize', '100', '1112', '43256'),
('20180708', '2222222222', 'suv', '314970', '1134', '13400');



DROP TABLE IF EXISTS `vehicle`;
CREATE TABLE IF NOT EXISTS `vehicle` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `vlicence` varchar(26) NOT NULL,
  `make` varchar(26) NOT NULL,
  `model` varchar(26) NOT NULL,
  `year` int(10) NOT NULL,
  `odometer` int(10) NOT NULL,
  `status` varchar(26) NOT NULL,
  `location` varchar(26) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19997 DEFAULT CHARSET=latin1;


INSERT INTO `vehicle` (`id`, `vlicence`, `make`, `model`, `year`, `odometer`, `status`, `location`) VALUES
(10001, 'bc001', 'auto', 'midsize', 1983, 0, 'avaliable', 'vancouver'),
(10002, 'bc002', 'bmw', 'suv', 2003, 22, 'inuse', 'ubc'),
(10005, 'on001', 'auto', 'suv', 2018, 2, 'inuse', 'ubc'),
(19996, 'bc003', 'toyota', 'suv', 2009, 34, 'avaliable', 'richmond'),
(12345, 'on005', 'auto', 'midsize', 1983, 18, 'avaliable', 'ubc'),
(12342, 'bc023', 'auto', 'truck', 1234, 18, 'avaliable', 'ubc'),
(12568, 'bc096', 'bmw', 'standard', 1765, 13, 'avaliable', 'richmond'),
(10063, 'bc035', 'auto', 'fullsize', 1234, 2, 'avaliable', 'ubc'),
(10284, 'bc099', 'bmw', 'economy', 2003, 12, 'avaliable', 'Vancouver'),
(19234, 'on022', 'auto', 'compact', 1983, 12, 'avaliable', 'ubc');



DROP TABLE IF EXISTS `vehicletype`;
CREATE TABLE IF NOT EXISTS `vehicletype` (
  `vtName` varchar(26) NOT NULL,
  `features` varchar(26) NOT NULL,
  `weekRate` int(5) NOT NULL,
  `dayRate` int(5) NOT NULL,
  `hourRate` int(5) NOT NULL,
  `kiloRate` int(5) NOT NULL,
  `wlnsRate` int(5) NOT NULL,
  `hlnsRate` int(5) NOT NULL,
  `dlnsRate` int(5) NOT NULL,
  PRIMARY KEY (`vtName`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



INSERT INTO `vehicletype` (`vtName`, `features`, `weekRate`, `dayRate`, `hourRate`, `kiloRate`, `wlnsRate`, `hlnsRate`, `dlnsRate`) VALUES
('suv', 'gasoline', 132, 30, 10, 23, 6, 1, 3),
('midsize', 'hybird', 212, 50, 30, 10, 40, 20, 5),
('compact', 'battary', 11, 2, 1, 3, 4, 5, 6),
('truck', 'whatever I don\'t care', 212, 45, 7, 4, 2, 1, 5),
('standard', 'battary', 11, 2, 4, 5, 6, 7, 343),
('fullsize', 'wind', 12, 4, 5, 6, 7, 8, 4),
('economy', 'something we don\'t know', 11, 10, 1, 5, 9, 3, 1);
COMMIT;

