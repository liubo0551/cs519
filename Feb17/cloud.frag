varying vec3  MCposition;
varying vec3  ECposition;

uniform vec4 SkyColor;
uniform vec4 CloudColor;
uniform float Bias;
uniform sampler3D Noise3;

void main( )
{
	vec4  nv  = texture3D( Noise3, MCposition );

	float intensity = nv.r + nv.g + nv.b + nv.a;
	intensity = ( intensity - 1. ) / 2.;		// 0. -> 1.

	vec3 color   = mix( SkyColor.rgb, CloudColor.rgb, clamp( Bias+intensity, 0., 1. ) );

	if( ECposition.y >= 0. )
		gl_FragColor = vec4(color, 1.0);
	else
		gl_FragColor = vec4( 0., 0., 0., 1. );

}
