drop database if exists `mytable`;
create database `mytable`;
use `mytable`;

drop table if exists blog;

create table `blog` (
  `id` varchar(50) not null,
  `slug` varchar(50),
  `title` varchar(50),
  `categories` varchar(100),
  `cover` varchar(512) character set 'ascii' collate 'ascii_general_ci',
  `content` text,
   primary key (`id`)
);
