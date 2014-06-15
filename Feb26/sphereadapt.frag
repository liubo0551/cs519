#version 400 core

uniform float uLightX, uLightY, uLightZ;
uniform float uKa, uKd;
uniform bool  uFlat;
uniform vec4  uColor;


flat in vec3 gNormalF;
     in vec3 gNormalS;
     in vec3 gPosition;

out vec4 fFragColor;

void main( )
{
	vec3 lightPos = vec3( uLightX, uLightY, uLightZ );
	float lightIntensity  = abs( dot( normalize( lightPos - gPosition ), uFlat ? gNormalF : gNormalS ) );
	fFragColor = vec4(  ( uKa + uKd*lightIntensity ) * uColor.rgb, 1.  );
}
