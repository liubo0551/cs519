#version 330 compatibility
uniform float Timer;
uniform float uNoiseAmp;
uniform sampler2D Noise2;
float waves[300];
float PI = 3.14159265358979323846264;


float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
            
void calc_normal(in vec2 uv, out vec3 N)
{
   
   N = vec3(0.0, 0.0, 1.0);
   for (int i = 0; i < 300; i += 6) {
	   float A = waves[i] * waves[i+3];         // Amplitude
	   float omega = 2.0 * PI / waves[i];       // Frequency
	   float phi = waves[i+2] * omega;          // Phase
	   float k = waves[i+1];
	   float term = omega * dot(vec2(waves[i+4], waves[i+5]), uv) + phi * Timer; //10 sec
	   float C = cos(term);
	   float S = sin(term);
	   float val = pow(0.5 * (S + 1.0), k - 1.0) * C;
	   val = omega * A * k * val;
	   N += vec3(waves[i+4] * val,
				 waves[i+5] * val,
				 0.0);
   }
   N = normalize(N); 
}

void main(void)
{
	
	//vec4 nv = texture( Noise2, vec2(uNoiseAmp*Timer,5.) );
	
	//float sum = nv.r + nv.g + nv.b + nv.a; // range is 1. -> 3. 
	//sum = ( sum - 2. ); 
	
	for (int i = 0; i < 300; i=i+6) {
        float wl = waves[i] = ((texture( Noise2, vec2(uNoiseAmp*i,5.) )).x * 0.5f + 0.3f);
		vec2 temp_nv = normalize(vec2((texture( Noise2, vec2(uNoiseAmp*(i+1),5.) )).x,(texture( Noise2, vec2(uNoiseAmp*(i+2),5.) )).y));
        
        waves[i+1] = 5.f*((texture( Noise2, vec2(uNoiseAmp*(i+1),5.) )).y * 2.f + 1.f);
        waves[i+2] = 0.05f * sqrt(PI/wl);
        waves[i+3] = 0.03f;
		waves[i+4] = temp_nv.x;
		waves[i+5] = temp_nv.y;
    }
	
   vec3 N;
   calc_normal(gl_FragCoord.st/128.0, N);
   N = (N * 0.5) + 0.5;
   gl_FragColor = vec4(N.xyz, 1.0);
}