uniform sampler2D InUnit;
varying vec2  vST;

const vec3  OFF   = vec3( 1., 1., 1. );
const vec3  ON    = vec3( 0., 0., 1. );

const float TB = 0.20;
const float TR = 0.20;
const int T1 = 1;
const int T3 = 3;
const int T4 = 4;

#define GAME_OF_LIFE
//	#define LAGRANGE

void main()
{
	ivec2 isize = textureSize( InUnit, 0 );
	vec2 st = vST;
	ivec2 ist = ivec2( st.s*float(isize.s-1) , st.t*float(isize.t-1) );
	ivec2 istp0 = ivec2( 1, 0 );
	ivec2 ist0p = ivec2( 0, 1 );
	ivec2 istpp = ivec2( 1, 1 );
	ivec2 istpm = ivec2( 1, -1 );
	
	vec3 i00 =   texelFetch( InUnit, ist, 0 ).rgb;
	vec3 im10 =  texelFetch( InUnit, ist-istp0, 0 ).rgb;
	vec3 i0m1 =  texelFetch( InUnit, ist-ist0p, 0 ).rgb;
	vec3 ip10 =  texelFetch( InUnit, ist+istp0, 0 ).rgb;
	vec3 i0p1 =  texelFetch( InUnit, ist+ist0p, 0 ).rgb;
	vec3 im1m1 = texelFetch( InUnit, ist-istpp, 0 ).rgb;
	vec3 ip1p1 = texelFetch( InUnit, ist+istpp, 0 ).rgb;
	vec3 im1p1 = texelFetch( InUnit, ist-istpm, 0 ).rgb;
	vec3 ip1m1 = texelFetch( InUnit, ist+istpm, 0 ).rgb;

#ifdef LAGRANGE
	vec3 del  = im10 + ip10 + i0m1 + i0p1 - 4.*i00;
	i00 += 0.5*del;
	gl_FragColor = vec4( i00, 1. );
#endif
	
#ifdef GAME_OF_LIFE
	int sum = 0;
	if( im10.b  > TB  &&  im10.r  < TR )	sum++;
	if( i0m1.b  > TB  &&  i0m1.r  < TR )	sum++;
	if( ip10.b  > TB  &&  ip10.r  < TR )	sum++;
	if( i0p1.b  > TB  &&  i0p1.r  < TR )	sum++;
	if( im1m1.b > TB  &&  im1m1.r < TR )	sum++;
	if( ip1p1.b > TB  &&  ip1p1.r < TR )	sum++;
	if( im1p1.b > TB  &&  im1p1.r < TR )	sum++;
	if( ip1m1.b > TB  &&  ip1m1.r < TR )	sum++;
	
	vec3 newcolor = i00;

	if( sum == T3 )
	{
		newcolor = ON;
	}
	else if( sum <= T1  ||  sum >= T4 )
	{
		newcolor = OFF;
	}

	gl_FragColor = vec4( newcolor, 1. );
#endif
}
