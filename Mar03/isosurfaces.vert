uniform int	Steps;
varying vec3	STP;		// starting location
varying vec3	Dir;		// tracing direction
varying vec3	Tnorm;	// transformed normal -- will be used to cull
					// the backfaces of the bounding surface
uniform bool	Perspective;

const float SQRT3 = 1.7320508;

void
main( )
{
	Tnorm = gl_NormalMatrix * gl_Normal;

	STP.stp = ( gl_Vertex.xyz + 1. ) / 2.;	// xyz [-1.,1.] to stp [0.,1.]
							// In the fragment shader, STP will tell us
							// where to start sampling the volume data

	// leave the STP alone, rotate the position forwards, rotate the Dir backwards

	vec4 xyzw;
	vec3 stp;
	vec3 dir;

	if( Perspective )		// perspective
	{
		xyzw = gl_ModelViewMatrix*gl_Vertex;	// where the vertex went when it got moved into the scene
		stp = ( xyzw.xyz + vec3(1.,1.,1.) ) / 2.;		// change from xyz [-1.,1.] to stp [0.,1.]
		vec3 eyestp = ( vec3(0.,0.,0.) + vec3( 1., 1., 1. ) ) / 2.;	// same for eye position
		dir = stp - eyestp;			// vector from eye to vertex in stp coords
	}
	else				// orthographic
	{
		dir = vec3( 0., 0., -1. );		// stp vector to the vertex
	}

	Dir = SQRT3 * normalize( ( gl_ModelViewMatrixInverse * vec4(dir,0.) ).stp ) / float(Steps);
					// Dir has had translations removed and uniform scale normailzed out.
					// In the fragment shader, Dir will tell us how to get to the
					// next volume data value to sample.

	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
