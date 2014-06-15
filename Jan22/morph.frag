varying vec4 Color;
varying float LightIntensity;
varying vec2  ST;

uniform float Density;
uniform float Frequency;
uniform vec4 BackColor;
uniform float Tol;

float
Pulse( float density, float tol, float vals, float valt )
{
	return	smoothstep( .5 - density/2. - tol, .5 - density/2. + tol, vals ) -
			smoothstep( .5 + density/2. - tol, .5 + density/2. + tol, vals ) +
			smoothstep( .5 - density/2. - tol, .5 - density/2. + tol, valt ) -
			smoothstep( .5 + density/2. - tol, .5 + density/2. + tol, valt );
}

void main( )
{
	float s = ST.s;
	float t = ST.t;

	float sf = s * Frequency;
	float tf = t * Frequency;
	
	float tt = Pulse( Density, Tol, fract(sf), fract(tf) );
	Color = mix( Color, BackColor, tt );
	Color = clamp( Color, 0., 1. );


	gl_FragColor = vec4( LightIntensity*Color.rgb, Color.a );
}
