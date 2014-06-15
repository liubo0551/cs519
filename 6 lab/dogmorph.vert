uniform float uForce,uForce1;
uniform float uX,uY,uZ;


varying vec4  Color;
varying float LightIntensity;


const float SIDE = 2.;

void main( )
{
	//vec4 vertex0 = gl_Vertex;
	vec4 vertex0 = vec4(uX,uY,uZ,1.);
//	vertex0.xyz *= 4./length(vertex0.xyz);
//	if( uCube )
//	{
//		vertex0.xyz = clamp( vertex0.xyz, -SIDE, SIDE );
//	}

    	vec3 tnorm      = normalize( vec3( gl_NormalMatrix * gl_Normal ) );
	vec3 LightPos = vec3( 5., 10., 10. );
	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
    	LightIntensity  = abs( dot( normalize(LightPos - ECposition), tnorm ) );
	if( LightIntensity < 0.2 )
		LightIntensity = 0.2;
		
	Color = gl_Color;
	//morph 1
	float dis = distance(gl_Vertex.xyz, vertex0.xyz);
	
	vec4 positionA =  mix(gl_Vertex,vec4(uX,uY,uZ,1.), uForce/(dis*dis) );
	
	//morph 2
	vec4 vertex1 = vec4(-uX,-uY,-uZ,1.);
	float dis1 = distance(positionA.xyz, vertex1.xyz);
	vec4 positionB =  gl_ModelViewProjectionMatrix *mix(positionA,vec4(-uX,-uY,-uZ,1.), uForce1/(dis1*dis1) );
	
	
	//if (mix( vec4(uX,uY,uZ,1.)-vec4(gl_Vertex.xyz,0.) , vec4(uX-1.,uY-1.,uZ-1.,1.), uForce/(dis*dis) ).x<=uX-1.)
	
	if(dot((mix(positionA,vec4(-uX,-uY,-uZ,1.), uForce1/(dis1*dis1) ).xyz-vertex0.xyz ),gl_Vertex.xyz-vertex0.xyz)<=0.0)
		gl_Position = gl_ModelViewProjectionMatrix *vec4(uX,uY,uZ,1.);
	else
		{
		if(dot((mix(positionA,vec4(-uX,-uY,-uZ,1.), uForce1/(dis1*dis1)).xyz-vertex1.xyz ),gl_Vertex.xyz-vertex1.xyz)<=0.0)
			gl_Position = gl_ModelViewProjectionMatrix *vec4(-uX,-uY,-uZ,1.);
		else
			gl_Position = positionB;
		}
	

	
	
		
	
}
