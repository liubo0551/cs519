uniform float Ambient;
uniform float BumpDensity;
uniform float BumpSize;
uniform vec4  SurfaceColor;
uniform float Ang;
uniform float BumpHeight;

varying vec3 BTNx, BTNy, BTNz;
varying vec2 vST;
varying vec3 DirToLight;

float Cang, Sang;

vec3
ToXyz( vec3 sth )
{
	float xp = sth.x*Cang - sth.y*Sang;
	sth.y    = sth.x*Sang + sth.y*Cang;
	sth.x    = xp;
	// sth.z = sth.z;
	sth = normalize( sth );

	vec3 xyz;
	xyz.x = dot( BTNx, sth );
	xyz.y = dot( BTNy, sth );
	xyz.z = dot( BTNz, sth );
	return normalize( xyz );
}


void main()
{
	const float PI = 3.14159265;

	vec2 st = vST.st;	// locate the bumps based on (s,t)

	float Swidth  = 1. / BumpDensity;
	float Theight = 1. / BumpDensity;
	float numInS = floor( st.s /  Swidth );
	float numInT = floor( st.t / Theight );

	vec2 center;
	center.s = numInS * Swidth   +   Swidth/2.;
	center.t = numInT * Theight  +  Theight/2.;
	st -= center;	// st is now wrt the center of the bump

	Cang = cos(Ang);
	Sang = sin(Ang);
	vec2 stp;		// st' = st rotated by -Ang
	stp.s =  st.s*Cang + st.t*Sang;
	stp.t = -st.s*Sang + st.t*Cang;
	float theta = atan( stp.t, stp.s );

	vec3 normal = ToXyz( vec3( 0., 0., 1. ) );

	if( abs(stp.s) > Swidth/4.  ||  abs(stp.t) > Theight/4. )
	{
		normal = ToXyz( vec3( 0., 0., 1. ) );
	}
	else
	{
		if( PI/4. <= theta  &&  theta <= 3.*PI/4. )
		{
			normal = ToXyz(  vec3( 0., BumpHeight, Theight/4. )  );
		}
		else if( -PI/4. <= theta  &&  theta <= PI/4. )
		{
			normal = ToXyz(  vec3( BumpHeight, 0., Swidth/4. )  );
		}
		else if( -3.*PI/4. <= theta  &&  theta <= -PI/4. )
		{
			normal = ToXyz(  vec3( 0., -BumpHeight, Theight/4. )  );
		}
		else if( theta >= 3.*PI/4.  ||  theta <= -3.*PI/4. )
		{
			normal = ToXyz(  vec3( -BumpHeight, 0., Swidth/4. )  );
		}
	}

	float intensity = Ambient + (1.-Ambient)*dot(normal, DirToLight);
	vec3 litColor = SurfaceColor.rgb * intensity;
	gl_FragColor = vec4( litColor, SurfaceColor.a );
}
