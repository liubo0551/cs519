varying vec4 Color;
varying float LightIntensity; 
uniform float Blend;
uniform float OffsetS, OffsetT;
uniform float Frequency;
uniform sampler2D TexUnit;

void main()
{
	float s = gl_TexCoord[0].s;
	float t = gl_TexCoord[0].t;

	float sf = fract( s * Frequency + OffsetS );
	float tf = fract( t * Frequency + OffsetT );

	vec3 newcolor = texture2D( TexUnit, vec2(sf,tf) ).rgb;
	newcolor = mix( newcolor, Color.rgb, Blend );
	gl_FragColor = vec4( LightIntensity*newcolor, 1. );
}
