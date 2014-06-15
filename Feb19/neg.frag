#version 330 compatibility

uniform sampler2D ImageUnit;
uniform float uT;
in vec2 vST;

void main( )
{
	vec3 irgb = texture2D( ImageUnit,  vST ).rgb;
	vec3 neg = vec3(1.,1.,1.) - irgb;
	gl_FragColor = vec4( mix( irgb, neg, uT ), 1. );
}
