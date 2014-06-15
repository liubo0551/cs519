#version 330 compatibility

uniform float uLightX, uLightY, uLightZ;
uniform float uKa, uKd, uKs;
uniform vec4  uColor;
uniform vec4  uSpecularColor;
uniform float uShininess;
uniform bool  uPerFragment;
uniform bool  uFlat;
uniform	float uA;
uniform	float uB;
uniform	float uC;
uniform float uNoiseAmp;
uniform float uNoiseFreq;

uniform sampler3D Noise3;

const float PI = 3.14159265;


flat out vec3 vNf;
     out vec3 vNs;
flat out vec3 vLf;
     out vec3 vLs;
flat out vec3 vEf;
     out vec3 vEs;

flat out vec3 vPVf;
     out vec3 vPVs;

vec3
RotateNormal( float angx, float angy, vec3 n )
{
        float cx = cos( angx );
        float sx = sin( angx );
        float cy = cos( angy );
        float sy = sin( angy );

        // rotate about x:
        float yp =  n.y*cx - n.z*sx;    // y'
        n.z      =  n.y*sx + n.z*cx;    // z'
        n.y      =  yp;
        // n.x      =  n.x;

        // rotate about y:
        float xp =  n.x*cy + n.z*sy;    // x'
        n.z      = -n.x*sy + n.z*cy;    // z'
        n.x      =  xp;
        // n.y      =  n.y;

        return normalize( n );
}


void
main( )
{ 
	vec4 new_vertex = aVertex;

	new_vertex.z = uA * cos(uB*aVertex.x) * cos(uC*aVertex.y);
	
	vec4 ECposition = uModelViewMatrix * new_vertex;

	vec3 eyeLightPosition = vec3( uLightX, uLightY, uLightZ );
	
	float dzdx = -uA * uB * sin(uB*new_vertex.x) * cos(uC*new_vertex.y);
	float dzdy = -uA * uC * cos(uB*new_vertex.x) * sin(uC*new_vertex.y);
	vec3 Tx = vec3(1.,0.,dzdx);
	vec3 Ty = vec3(0.,1.,dzdy);
	vec3 new_normal = normalize(cross(Tx,Ty));
	
	//extra credit modify normal with noise
	vec4 nvx = texture3D( Noise3, uNoiseFreq*new_vertex.xyz );
	float angx = nvx.r + nvx.g + nvx.b + nvx.a; // range is 1. -> 3. 
	angx = ( angx - 2. ); // range is now -1. -> 1. 
	angx = angx*PI; // range is now -PI. -> PI.
	angx = angx*uNoiseAmp; 

    vec4 nvy = texture3D( Noise3, uNoiseFreq*vec3(new_vertex.xy,new_vertex.z+0.5) );
	float angy = nvy.r + nvy.g + nvy.b + nvy.a; // range is 1. -> 3. 
	angy = ( angy - 2. ); // range is now -1. -> 1. 
	angy = angy*PI; // range is now -PI. -> PI.
	angy = angy*uNoiseAmp; 
	
	new_normal = RotateNormal(angx, angy, new_normal);
		
	vNs = normalize( uNormalMatrix * new_normal );	// surface normal vector
	vNf = vNs;

	vLs = eyeLightPosition - ECposition.xyz;		// vector from the point
	vLf = vLs;
								// to the light position
	vEs = vec3( 0., 0., 0. ) - ECposition.xyz;		// vector from the point
	vEf = vEs;

	vec3 Normal;
	vec3 Light;
	vec3 Eye;
	if( uFlat )
	{
		Normal = normalize(vNf);
		Light =  normalize(vLf);
		Eye =    normalize(vEf);
	}
	else
	{
		Normal = normalize(vNs);
		Light =  normalize(vLs);
		Eye =    normalize(vEs);
	}

	vec4 ambient = uKa * uColor;

	float d = max( dot(Normal,Light), 0. );
	vec4 diffuse = uKd * d * uColor;

	float s = 0.;
	if( dot(Normal,Light) > 0. )		// only do specular if the light can see the point
	{
		vec3 ref = normalize( 2. * Normal * dot(Normal,Light) - Light );
		s = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	vec4 specular = uKs * s * uSpecularColor;

	vPVs = ambient.rgb + diffuse.rgb + specular.rgb;
	vPVf = vPVs;

	gl_Position = uModelViewProjectionMatrix * new_vertex;
}
