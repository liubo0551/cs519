#version 330 compatibility
uniform sampler2D uImageUnit;
uniform float uScenter, uTcenter, uDs, uDt;	
uniform float uMagFactor,uRotAngle;
uniform float uSharpFactor;
uniform bool uCircle; 
in vec2 vST;

void main()
{
	vec2 vST_a = vST;
	vec4 WHITE = vec4( 1.,1.,1.,1. );
	vec3 color = vec3( 0.,0.,0.);
	float	 ResS, ResT;
	vec3 irgb;
	
	vec4 refractcolor;
	
	//if st is in the square
	if(uCircle)
		{
		if(((vST_a.s-uScenter)*(vST_a.s-uScenter)+(vST_a.t-uTcenter)*(vST_a.t-uTcenter))<(uDs*uDs+uDt*uDt))
			{
			
			
			vST_a -= vec2(uScenter,uTcenter);
			vST_a /= uMagFactor;
			//rotation
			float x_new = vST_a.s*cos(uRotAngle) - vST_a.t*sin(uRotAngle);
			float y_new = vST_a.s*sin(uRotAngle) + vST_a.t*cos(uRotAngle);
			vST_a = vec2(x_new,y_new);
			
			vST_a += vec2(uScenter,uTcenter);
			
			//sharp
			vec2 ires = vec2(float(textureSize( uImageUnit, 0 ).s),float(textureSize( uImageUnit, 0 ).t));
			ResS = float( ires.s );
			ResT = float( ires.t );
			vec2 stp0 = vec2(1./ResS,  0. );
			vec2 st0p = vec2(0.     ,  1./ResT);
			vec2 stpp = vec2(1./ResS,  1./ResT);
			vec2 stpm = vec2(1./ResS, -1./ResT);
			vec3 i00 =   texture2D( uImageUnit, vST_a ).rgb;
			vec3 im1m1 = texture2D( uImageUnit, vST_a-stpp ).rgb;
			vec3 ip1p1 = texture2D( uImageUnit, vST_a+stpp ).rgb;
			vec3 im1p1 = texture2D( uImageUnit, vST_a-stpm ).rgb;
			vec3 ip1m1 = texture2D( uImageUnit, vST_a+stpm ).rgb;
			vec3 im10 =  texture2D( uImageUnit, vST_a-stp0 ).rgb;
			vec3 ip10 =  texture2D( uImageUnit, vST_a+stp0 ).rgb;
			vec3 i0m1 =  texture2D( uImageUnit, vST_a-st0p ).rgb;
			vec3 i0p1 =  texture2D( uImageUnit, vST_a+st0p ).rgb;
			vec3 target = vec3(0.,0.,0.);
			target += 1.*(im1m1+ip1m1+ip1p1+im1p1);
			target += 2.*(im10+ip10+i0m1+i0p1);
			target += 4.*(i00);
			target /= 16.;
			refractcolor = vec4(texture(uImageUnit,vST_a).rgb,1.0);
			irgb =texture(uImageUnit,vST_a).rgb;
			refractcolor.xyz = vec3( mix( target, irgb, uSharpFactor) );
			}
		else
			refractcolor = vec4(texture(uImageUnit,vST_a).rgb,1.0);
		
		}
	else{
		
		if((abs(vST_a.s-uScenter)<uDs/2.0)&&(abs(vST_a.t-uTcenter)<uDt/2.0))
			{
			
			
			vST_a -= vec2(uScenter,uTcenter);
			vST_a /= uMagFactor;
			//rotation
			float x_new = vST_a.s*cos(uRotAngle) - vST_a.t*sin(uRotAngle);
			float y_new = vST_a.s*sin(uRotAngle) + vST_a.t*cos(uRotAngle);
			vST_a = vec2(x_new,y_new);
			
			vST_a += vec2(uScenter,uTcenter);
			
			//sharp
			vec2 ires = vec2(float(textureSize( uImageUnit, 0 ).s),float(textureSize( uImageUnit, 0 ).t));
			ResS = float( ires.s );
			ResT = float( ires.t );
			vec2 stp0 = vec2(1./ResS,  0. );
			vec2 st0p = vec2(0.     ,  1./ResT);
			vec2 stpp = vec2(1./ResS,  1./ResT);
			vec2 stpm = vec2(1./ResS, -1./ResT);
			vec3 i00 =   texture2D( uImageUnit, vST_a ).rgb;
			vec3 im1m1 = texture2D( uImageUnit, vST_a-stpp ).rgb;
			vec3 ip1p1 = texture2D( uImageUnit, vST_a+stpp ).rgb;
			vec3 im1p1 = texture2D( uImageUnit, vST_a-stpm ).rgb;
			vec3 ip1m1 = texture2D( uImageUnit, vST_a+stpm ).rgb;
			vec3 im10 =  texture2D( uImageUnit, vST_a-stp0 ).rgb;
			vec3 ip10 =  texture2D( uImageUnit, vST_a+stp0 ).rgb;
			vec3 i0m1 =  texture2D( uImageUnit, vST_a-st0p ).rgb;
			vec3 i0p1 =  texture2D( uImageUnit, vST_a+st0p ).rgb;
			vec3 target = vec3(0.,0.,0.);
			target += 1.*(im1m1+ip1m1+ip1p1+im1p1);
			target += 2.*(im10+ip10+i0m1+i0p1);
			target += 4.*(i00);
			target /= 16.;
			refractcolor = vec4(texture(uImageUnit,vST_a).rgb,1.0);
			irgb =texture(uImageUnit,vST_a).rgb;
			refractcolor.xyz = vec3( mix( target, irgb, uSharpFactor) );
			}
		else
			refractcolor = vec4(texture(uImageUnit,vST_a).rgb,1.0);
		}
	
	gl_FragColor = refractcolor;
}
