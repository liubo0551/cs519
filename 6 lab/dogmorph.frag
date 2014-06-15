varying vec4 Color;
varying float LightIntensity; 

void main()
{	
	gl_FragColor = vec4( LightIntensity*Color.rgb, Color.a );
}
