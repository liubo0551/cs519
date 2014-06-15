#version 400 compatibility
#extension GL_EXT_gpu_shader4: enable
#extension GL_EXT_geometry_shader4: enable

layout( triangles )  in;
layout( triangle_strip, max_vertices=200 )  out;

uniform float Shrink;
uniform float LightX, LightY, LightZ;

in vec3 Normal[ ];
out float LightIntensity;

vec3 LightPos = vec3( LightX, LightY, LightZ );

vec3 V[3];
vec3 CG;

void
ProduceVertex( int v )
{
	LightIntensity = abs( dot( normalize(LightPos - V[v]), normalize(Normal[v]) ) );
	gl_Position = gl_ProjectionMatrix * vec4( CG + Shrink * ( V[v] - CG ), 1. );
	EmitVertex( );
}



void
main()
{
	V[0]  =   gl_PositionIn[0].xyz;
	V[1]  =   gl_PositionIn[1].xyz;
	V[2]  =   gl_PositionIn[2].xyz;

	CG = ( V[0] + V[1] + V[2] ) / 3.;

	ProduceVertex( 0 );
	ProduceVertex( 1 );
	ProduceVertex( 2 );
}
