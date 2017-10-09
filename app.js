const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
// const phantom = require('node-phantom');
const phantom = require('phantom');
const app = express();

app.get('/codechef',(req,res,next)=>{

    let i=1;
    // let Rankers =[];
    var _page,_ph,_outObj;
    var textleng ="<ul>";
    // while(i<=3){
        url = 'https://www.codechef.com/ratings/long-challenge?filterBy=Institution%3DNetaji%20Subhas%20Institute%20of%20Technology%2C%20New%20Delhi&order=asc&page='+i+'&sortBy=global_rank';
        console.log(url);

        phantom.create().then(ph=>{
                _ph = ph;
                return _ph.createPage();
            }).then(page=>{
                _page = page;
                return _page.open(url);
            }).then(status =>{
                console.log(status);
                return _page.property('content');
            }).then(content=>{
                // console.log(content);
                const $ = cheerio.load(content);
                $('div.user-name').each((i,element)=>{
                    // Rankers.push(i);
                    // console.log('********');
                    // console.log(element);
                    textleng += "<li>";
                    // console.log(element.attribs.title);
                    textleng += element.attribs.title + "\t";
                    // console.log('++++++++');
                    // console.log(element.children[0].children[0].children[0].data);
                    textleng += element.children[0].children[0].children[0].data + "\t";
                    // console.log('////////');
                    // console.log(element.children[0].children[0].next.children[0].data);
                    textleng += element.children[0].children[0].next.children[0].data;
                    textleng+="</li>"
                });
                textleng+='</ul>';
                _page.close();
                _ph.exit();
            res.send(textleng);
            }).catch(e=>{
                console.log(e);
            }).then(()=>{
            i++;
        })

    // }



});

app.listen(8040, function () {
    console.log("Server started on http://localhost:8040");
});