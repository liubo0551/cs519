uniform sampler2D InUnit;
varying vec2  vST;

void main()
{
	vec3 newcolor = texture2D( InUnit, vST ).rgb;
	gl_FragColor = vec4( newcolor, 1. );
}
