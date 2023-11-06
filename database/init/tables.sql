drop database if exists `int2211-blog`;
create database `int2211-blog`;
use `int2211-blog`;

drop table if exists topic;

create table `topic` (
  `topicID` int not null AUTO_INCREMENT,
  `name` varchar(50) not null,
  primary key (`topicID`)
);

insert into topic(`name`) values
('Backend'),
('Frontend'),
('Cloud'),
('Database');

drop table if exists user;

create table `user` (
  `userID` varchar(50) not null,
  `username` varchar(50) not null,
  `password` varchar(50) not null,
  primary key (`userID`)
);

drop table if exists blog;

create table `blog` (
  `id` int not null AUTO_INCREMENT,
  `slug` varchar(50),
  `title` varchar(50),
  `cover` varchar(512) character set 'ascii' collate 'ascii_general_ci',
  `content` text,
  `author` varchar(50) not null,
  primary key (`id`),
  foreign key(`author`) references user(`userID`)
);

drop table if exists blog_topic;

create table `blog_topic` (
  `blogID` int not null,
  `topicID` int not null,
  primary key (`blogID`, `topicID`),
  foreign key (`blogID`) references blog(`id`),
  foreign key (`topicID`) references topic(`topicID`)
);

drop table if exists comment;

create table `comment` (
   `commentID` int not null AUTO_INCREMENT,
   `blogID` int not null,
   `content` text, 
   `userID` varchar(50) not null 
   primary key (`commentID`),
   foreign key (`userID`) references user(`userID`)
)