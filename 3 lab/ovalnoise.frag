varying vec4  Color;
varying float LightIntensity;
varying vec3  vMCposition;
varying float Z_depth;

uniform float uAd;
uniform float uBd;
uniform float uNoiseAmp;
uniform float uNoiseFreq;
uniform float uTol;
uniform float uAlpha;
uniform float uChromaRed;
uniform float uChromaBlue;
uniform bool uUseChromaDepth;
uniform float uBlend;

uniform sampler3D Noise3;

vec3
Rainbow( float t )
{
	t = clamp( t, 0., 1. );

	float r = 1.;
	float g = 0.0;
	float b = 1.  -  6. * ( t - (5./6.) );

        if( t <= (5./6.) )
        {
                r = 6. * ( t - (4./6.) );
                g = 0.;
                b = 1.;
        }

        if( t <= (4./6.) )
        {
                r = 0.;
                g = 1.  -  6. * ( t - (3./6.) );
                b = 1.;
        }

        if( t <= (3./6.) )
        {
                r = 0.;
                g = 1.;
                b = 6. * ( t - (2./6.) );
        }

        if( t <= (2./6.) )
        {
                r = 1.  -  6. * ( t - (1./6.) );
                g = 1.;
                b = 0.;
        }

        if( t <= (1./6.) )
        {
                r = 1.;
                g = 6. * t;
        }

	return vec3( r, g, b );
}

void
main( )
{
	float s = gl_TexCoord[0].s;
	float t = gl_TexCoord[0].t;
	float up = 2. * s;
	float vp = 2. * t;
	
	//noise
	vec4  nv  = texture3D( Noise3, uNoiseFreq * vMCposition );
	float n = nv.r + nv.g + nv.b + nv.a;	// 1. -> 3.
	// n = ( n - 1. ) / 2.;			// 0. -> 1.
	n = ( n - 2. );				// -1. -> 1.
	float delta = uNoiseAmp * n;
	
	up+=delta;
	
	gl_FragColor = Color;		// default color
	
	float numinu = floor( up / (2.0*uAd) );
	float numinv = floor( vp / (2.0*uBd) );
	

	if( mod( numinu+numinv, 1. ) == 0. )
	{

			float uc = numinu*uAd + uAd/2.;
			float vc = numinv*uBd + uBd/2.;
			up = up - uc;
			vp = vp - vc;
			vec3 upvp =  vec3( up/uAd, vp/uBd, 0. );
			vec3 cntr =  vec3( uc/uAd, vc/uBd, 0. );
			//if( distance( upvp, cntr ) <=1. )
			float dis =((up - uc)*2./uAd)*((up - uc)*2./uAd) + ((vp - vc)*2./uBd)*((vp - vc)*2./uBd);
			if(abs(dis)<1.0+uTol)// new ellipse
			{		
				float td = smoothstep( 1.0-uTol, 1.0+uTol, dis );
				gl_FragColor = mix( vec4( 1., .5, 0. ,1.),Color, td );
				
				if( dis <= 1.-uTol )
				{
				gl_FragColor = vec4( 1., .5, 0. ,1.);
				}

				
				if(uAlpha == 0.)
				{
					discard;
				}
				else{
				gl_FragColor.a = uAlpha;
				}
			
			}
	if( uUseChromaDepth )
	{
		float t_chroma = (2./3.) * ( Z_depth - uChromaRed ) / ( uChromaBlue - uChromaRed );
		t_chroma = clamp( t_chroma, 0., 2./3. );
		vec3 rainbow_color = Rainbow( t_chroma );
		gl_FragColor.xyz = mix( gl_FragColor.xyz, rainbow_color, uBlend );
	}
	}
	gl_FragColor.rgb *= LightIntensity;	// apply lighting model
}
