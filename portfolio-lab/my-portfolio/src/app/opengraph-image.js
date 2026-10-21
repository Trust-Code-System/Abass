import { ImageResponse } from 'next/og';
export const runtime = 'edge';
export const alt = 'Abass Ibrahim | Developer & Designer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() { return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:80,background:'#1c1d20',color:'#f4f3ee',fontFamily:'sans-serif'}}><div style={{fontSize:80}}>Abass Ibrahim</div><div style={{fontSize:32,color:'#c1ff5d',marginTop:24}}>Developer & Designer</div></div>,size); }
