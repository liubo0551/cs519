uniform float Time;
uniform float Amp0, Amp1;
uniform float PhaseShift;
uniform float Pd;
uniform float LightX, LightY, LightZ;
uniform vec4  Color;

varying vec3  MCposition;
varying vec3  ECposition;

const float TWOPI = 2.*3.14159265;
const vec3 C0 = vec3( -2.5, 0., 0. );
const vec3 C1 = vec3(  2.5, 0., 0. );

void main( )
{
	float rad0 = length( MCposition - C0 );
	float H0   = -Amp0 * cos( TWOPI*rad0/Pd - TWOPI*Time ); 

	float rad1 = length( MCposition - C1 );
	float H1   = -Amp1 * cos( TWOPI*rad1/Pd - TWOPI*Time ); 

	float u = -Amp0 * (TWOPI/Pd) * sin( TWOPI*rad0/Pd - TWOPI*Time ); 
	float v = 0.;
	float w = 1.;

	float ang = atan( MCposition.y - C0.y, MCposition.x - C0.x );
	float up = dot( vec2(u,v), vec2(cos(ang), -sin(ang)) );
	float vp = dot( vec2(u,v), vec2(sin(ang),  cos(ang)) );
	float wp = 1.;

	u = -Amp1 * (TWOPI/Pd) * sin( TWOPI*rad1/Pd - TWOPI*Time - PhaseShift ); 
	v = 0.;
	ang = atan( MCposition.y - C1.y, MCposition.x - C1.x );
	up += dot( vec2(u,v), vec2(cos(ang), -sin(ang)) );
	vp += dot( vec2(u,v), vec2(sin(ang),  cos(ang)) );
	wp += 1.;
	vec3 normal = normalize( vec3( up, vp, wp ) );

    	float LightIntensity  = 1.0 * abs( dot( normalize(vec3(LightX,LightY,LightZ) - ECposition), normal ) );
	if( LightIntensity < 0.1 )
		LightIntensity = 0.1;

	gl_FragColor = vec4( LightIntensity*Color.rgb, Color.a );
}
