import{j as f,r as d,f as m,R as v,a as g}from"./vendor.78aeacac.js";const x=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function c(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=c(t);fetch(t.href,e)}};x();const r=f.exports.jsx,l=f.exports.jsxs;function y(s){var n=Math.floor(s/60),c=("0"+s%60).slice(-2);return n<60?`${n}:${c}`:`${Math.floor(n/60)+":"+("0"+n%60).slice(-2)}:${c}`}function N({items:s,selected:n,clickFunc:c}){let o;s.length>10?o=s.slice(0,10):o=s;const t=o.map((e,i)=>l("div",{className:n===i?"Selected Podcast":"Podcast",onClick:u=>c(e.enclosure.$.url,i,u),children:[r("div",{children:e.title}),l("div",{className:"PodDesc",children:[typeof e.description=="object"?e.description._:e.description,r("br",{}),"( ",y(e["itunes:duration"])," )"]})]},i));return r("div",{children:t})}function P(){let[s,n]=d.exports.useState([]),[c,o]=d.exports.useState(""),[t,e]=d.exports.useState(-1),[i,u]=d.exports.useState(!1);function p(a,h){o(a),u(!0),e(h)}return d.exports.useEffect(()=>{fetch("https://flannel-glade.glitch.me/?"+new URLSearchParams({rss:"http://www.espn.com/espnradio/feeds/rss/podcast.xml?id=2942325"}).toString()).then(a=>a.json()).then(a=>n(a.rss))},[]),s.length===0?l("div",{className:"App",children:[r("div",{children:"Loading"}),l("div",{className:"lds-facebook",children:[r("div",{}),r("div",{}),r("div",{})]})]}):l("div",{className:"App",children:[l("div",{className:"Header",children:[r("img",{src:s.channel.image.url,alt:""}),l("div",{className:"HeaderText",children:[r("div",{className:"Title",children:s.channel.title}),r("div",{children:s.channel.description})]})]}),r(m,{className:"mediaPlayer",url:c,playing:i,height:"40px",width:"100%",config:{forceAudio:!0,attributes:{height:"40px",width:"100%",controls:!0},tracks:[]}}),r(N,{items:s.channel.item,clickFunc:p,selected:t})]})}v.render(r(g.StrictMode,{children:r(P,{})}),document.getElementById("root"));
