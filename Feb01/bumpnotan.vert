uniform float LightX, LightY, LightZ;		// from a slider

varying vec2 vST;
varying vec3 LightDir;				// light direction in TNB coords

// N is the direction of normal
// T is the direction of "Tangent", which is (dx/dt, dy/dt, dz/dt)
// B is the TxN, which is the direction of (dx/ds, dy/ds, dz/ds)

void main () 
{
	vST = gl_MultiTexCoord0.st;

	// the vectors B-T-N form an X-Y-Z-looking right handed coordinate system:

	vec3 N = normalize(gl_NormalMatrix * gl_Normal);

	vec3 T;
	if( N.x != 0. )
	{
		T.y = T.z = 1.;		T.x = -( N.y + N.z ) / N.x;
	}
	else if( N.y != 0. )
	{
		T.x = T.z = 1.;		T.y = -( N.x + N.z ) / N.y;
	}
	else
	{
		T.x = T.y = 1.;		T.z = -( N.x + N.y ) / N.z;
	}
	T = normalize(T);
	vec3 B = normalize( cross(T, N) );

	// where the light is coming from:

	vec3 lightPosition = vec3( LightX, LightY, LightZ );	// world space vector

	// transform the lightPosition into surface coordinates:
	// (note: this is really a matrix multiply, a row at a time)

	vec3 v;
	v.x = dot( B, lightPosition );
	v.y = dot( T, lightPosition );
	v.z = dot( N, lightPosition );
	LightDir = normalize(v);		// surface space vector
					// z pointing in same dir as normal

	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
