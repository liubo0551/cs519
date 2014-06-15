#version 330 compatibility
uniform sampler2D ImageUnit;

in vec2 texcoord;
in vec3 lightv;
in vec3 viewv;
void main(void)
{
   vec3 N = texture2D(ImageUnit, texcoord*0.125).xyz * 2.0 - 1.0;
   N = normalize(N);
   vec3 specular = vec3(1.0) * pow(clamp(dot(reflect(normalize(lightv), N), viewv), 0.0, 1.0), 50.0);
   vec3 oceanblue = vec3(0.0, 0.0, 0.2);
   vec3 skyblue = vec3(0.39, 0.52, 0.93) * 0.9;
   const float R_0 = 0.6;
   float fresnel = R_0 + (1.0 - R_0) * pow((1.0 - dot(-normalize(viewv), N)), 5.0);
   fresnel = max(0.0, min(fresnel, 1.0));
   gl_FragColor = vec4(mix(oceanblue, skyblue, fresnel) + specular, 1.);
}