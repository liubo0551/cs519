#version 330 compatibility 

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void wave_function(in float waves[24], in float time, in vec3 pos,
                               out vec3 P, out vec3 N, out vec3 B, out vec3 T)
{
   float PI = 3.14159265358979323846264;
   P = pos;
   for (int i = 0; i < 24; i += 6) {
	   float A = waves[i] * waves[i+3];         // Amplitude
	   float omega = 2.0 * PI / waves[i];       // Frequency
	   float phi = waves[i+2] * omega;          // Phase
	   float Qi = waves[i+1]/(omega * A * 4.0); // Steepness

	   float term = omega * dot(vec2(waves[i+4], waves[i+5]), vec2(pos.x, pos.z)) + phi * time;
	   float C = cos(term);
	   float S = sin(term);
	   P += vec3(Qi * A * waves[i+4] * C,
				 A * S,
				 Qi * A * waves[i+5] * C);
   }
   B = vec3(0.0);
   T = vec3(0.0);
   N = vec3(0.0);
   for (int i = 0; i < 24; i += 6) {
	   float A = waves[i] * waves[i+3];         // Amplitude
	   float omega = 2.0 * PI / waves[i];       // Frequency
	   float phi = waves[i+2] * omega;          // Phase
	   float Qi = waves[i+1]/(omega * A * 4.0); // Steepness

	   float WA = omega * A;
	   float term = omega * dot(vec2(waves[i+4], waves[i+5]), vec2(P.x, P.z)) + phi * time;
	   float C = cos(term)/6.0;
	   float S = sin(term);
	   B += vec3 (Qi * waves[i+4]*waves[i+4] * WA * S,
				  Qi * waves[i+4] * waves[i+5] * WA * S,
				  waves[i+4] * WA * C);

	   T += vec3 (Qi * waves[i+4] * waves[i+5] * WA * S,
				  Qi * waves[i+5] * waves[i+5] * WA * S,
				  waves[i+5] * WA * C);

	   N += vec3 (waves[i+4] * WA * C,
				  waves[i+5] * WA * C,
				  Qi * WA * S);
   }
   B = normalize(vec3(1.0 - B.x, -B.y, B.z));
   T = normalize(vec3(-T.x, 1.0 - T.y, T.z));
   N = normalize(vec3(-N.x, -N.y, 1.0 - N.z));
}

float waves[24];
uniform float Timer;
vec3 light = vec3(0.f, 100.f, 0.f);
float PI = 3.14159265358979323846264;
uniform float uNoiseAmp;
uniform sampler2D Noise2;

out vec2 texcoord;
out vec3 lightv;
out vec3 viewv;
void main(void)
{	
	//cal waves[]
	//vec4 nv = texture( Noise2, vec2(uNoiseAmp*Timer,0.5) );

for (int i = 0; i < 24; i=i+6) {
        waves[i] = 10.;
		waves[i+1] = 0.8;
        waves[i+2] = 0.15;
        waves[i+3] = 0.02;
		waves[i+4] = 1.;
		waves[i+5] = 0.8;
    }
	


   vec3 P, N, B, T;
   wave_function(waves, Timer, gl_Vertex.xyz, P, N, B, T);
   lightv = vec3(dot(light, B),
				 dot(light, T),
				 dot(light, N));
   lightv = normalize(lightv);
   vec3 pos = (gl_ModelViewMatrix * vec4(P.xyz, 1.0)).xyz;
   viewv = vec3(dot(pos, B),
				dot(pos, T),
				dot(pos, N));
   viewv = normalize(viewv);
   texcoord = vec2(P.x, P.z) * 0.5 + 0.5;
   gl_Position = gl_ProjectionMatrix * vec4(pos, 1.0);
}